# Technical Test

The folder structure is divided into `frontend` and `backend` folders. Env files for frontend and backend are provided below. Copy them into your respective `frontend` and `backend` folders for simplicity. Use the same username and password given in the backend `.env` file to submit a `POST` request.

---

## Clone the Repository
```sh
git clone https://github.com/MTalha641/Technical-Test.git
```

---

## Database Setup
Navigate to the `backend` folder and run the following command to start the PostgreSQL database using Docker:
```sh
cd backend
docker-compose up -d
```

---

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
   ```sh
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=admin123
   POSTGRES_DB=ghost_kitchen
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   DATA_URL=https://simplemaps.com/static/data/world-cities/basic/simplemaps_worldcities_basicv1.75.zip
   JWT_SECRET=talha
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

---

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

---

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
   ```sh
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the frontend application:
   ```sh
   npm run dev
   ```

---

## Running the ETL Script
1. Navigate to the `etl` folder inside the `backend` directory:
   ```sh
   cd backend/etl
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the ETL script:
   ```sh
   python etl.py
   ```

---

## Quick Query Optimization

### **Query for Counting Entries by Location and Date Range**
```sql
SELECT COUNT(*)
FROM location_brand_platforms
WHERE location_id = '123'
AND created_at BETWEEN '2024-01-01 00:00:00' AND '2024-12-31 23:59:59';
```

### **Indexing and Optimization Strategies for Large Datasets**

#### **1. Composite Index (Improves Query Performance on Commonly Filtered Columns)**
```sql
CREATE INDEX idx_created_at
ON location_brand_platforms (location_id, created_at);
```
- Helps speed up queries filtering by both `location_id` and `created_at`.

#### **2. Partial Index (Optimizing Frequent Conditions like Active Status)**
```sql
CREATE INDEX idx_status
ON location_brand_platforms (location_id, created_at)
WHERE status = 'active';
```
- Useful if most queries filter only `active` records, reducing index size and query time.

#### **3. Partitioning (For Large Datasets)**
```sql
PARTITION OF location_brand_platforms
FOR VALUES FROM ('2025-01-01') TO ('2025-01-31');
```
- Splits large tables into smaller partitions for efficient querying (could be used in the location_brand_platforms table).

### **Trade-offs & Considerations**
- **Partial indexes** reduce query time but only help if the condition (`status = 'active'`) is frequently used.
- **Partitioning adds complexity** and should only be used for massive datasets (millions of rows).
- **Too many indexes** can slow down write operations, so indexing should be carefully planned and only applied on frequent operations.(we can analyze most used columns by checking the no of calls and execution time)

---

## Notes
- Ensure **Docker Desktop is running** before using `docker-compose`.

