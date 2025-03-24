# Technical Test
The folder structure is divided into frontend and backend folders. Env files for frontend and backend are provided below, copy them in your respective frontend and backend folders for simplicity purposes. Use the  same username and password given in the backend env file to submit a POST request.

## Clone the Repository
```sh
git clone https://github.com/MTalha641/Technical-Test.git

```

## Database Setup
Navigate to the `backend` folder and run the following command to start the PostgreSQL database using Docker:
```sh
cd backend
docker-compose up -d
```
## Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and add the following:
   ```
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=admin123
   POSTGRES_DB=ghost_kitchen
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   DATA_URL=https://simplemaps.com/static/data/world-cities/basic/simplemaps_worldcities_basicv1.75.zip
   JWT_SECRET=talha

4. Start the backend server:
   ```sh
   npm start
   ```
   ```
## Running Database Migrations
1. Navigate to the `migrations` folder inside the `backend` directory:
   ```sh
   cd migrations
   ```
2. Run the migration scripts:
   ```sh
   node 001_create_tables.js
   node 002_seed_data.js
   ```

## Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory and add the following:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the frontend application:
   ```sh
   npm run dev
   ```
   

## Running the ETL Script
1. Navigate to the `etl` folder inside the `backend` directory:
   ```sh
   cd /backend/etl
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the ETL script:
   ```sh
   python etl.py
   ```

## Notes
- Ensure **Docker Desktop is running** before using `docker-compose`.


