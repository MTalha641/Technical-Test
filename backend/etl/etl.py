import os
import requests
import zipfile
import io
import pandas as pd
import psycopg2
import logging
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


DB_NAME = os.getenv("POSTGRES_DB")
DB_USER = os.getenv("POSTGRES_USER")
DB_PASS = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("POSTGRES_HOST")
DB_PORT = os.getenv("POSTGRES_PORT")
DATA_URL = os.getenv("DATA_URL")

# the etl file maps country name to country and city to city in the locations table
def extract_data():
    logging.info("Downloading dataset from the link")

    try:
        response = requests.get(DATA_URL, stream=True)
        response.raise_for_status()
        
        with zipfile.ZipFile(io.BytesIO(response.content), 'r') as zip_ref:
            file_list = zip_ref.namelist()
            csv_file = "worldcities.csv"

            if csv_file not in file_list:
                logging.error(f"Expected {csv_file} not found in ZIP. Found: {file_list}")
                return None

            logging.info(f"Extracting {csv_file}...")
            with zip_ref.open(csv_file) as f:
                df = pd.read_csv(f, usecols=["city", "country"])
                logging.info(f"Dataset extracted successfully with {len(df)} records.")
                return df

    except Exception as e:
        logging.error(f"Error downloading or extracting data: {e}")
        return None

def transform_data(df):
    logging.info("Transforming data...")
    
    df["city"] = df["city"].str.strip()  
    df["country"] = df["country"].str.strip()  
    
    df = df.rename(columns={"country": "name"}) 
    logging.info("Data transformation complete.")
    
    return df


def load_data(df):
    logging.info("Connecting to PostgreSQL database...")

    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            host=DB_HOST,
            port=DB_PORT
        )
        cursor = conn.cursor()

    
        for _, row in df.iterrows():
            cursor.execute("""
                INSERT INTO locations (id, country_name, city)
                VALUES (gen_random_uuid(), %s, %s);
            """, (row["name"], row["city"]))

        conn.commit()
        logging.info(f"Successfully inserted {len(df)} records into locations table.")

    except Exception as e:
        logging.error(f"Error inserting data: {e}")

    finally:
        cursor.close()
        conn.close()
        logging.info("Database connection closed.")

if __name__ == "__main__":
    df = extract_data()
    if df is not None:
        df = transform_data(df)
        load_data(df)
