# Ghost Kitchen Management System

## 📌 Project Overview
This project is a **Ghost Kitchen Management System** that integrates:
- **PostgreSQL** as the database
- **Node.js (Express.js)** for the backend API
- **React.js** for the frontend
- **Python ETL script** to fetch and load data
- **Docker** to containerize the database

## 🚀 Features
- Manage locations, brands, and delivery platforms
- Store brand availability across locations and platforms
- API to retrieve and add new location-brand-platform records
- Authentication for secured endpoints
- ETL pipeline to import city-based location data

---

## 🛠️ Setup Instructions

### 1️⃣ **Clone the Repository**
```bash
git clone <repository-url>
cd ghost-kitchen-management
```

### 2️⃣ **Backend Setup**
#### 📂 Navigate to the backend folder:
```bash
cd backend
```
#### 📦 Install dependencies:
```bash
npm install
```
#### 🔑 Set up environment variables:
Create a `.env` file in the `backend/` directory and add:
```
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=ghost_kitchen
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATA_URL=https://simplemaps.com/static/data/world-cities/basic/simplemaps_worldcities_basicv1.75.zip
JWT_SECRET=<your-secret-key>
```
#### 🏗️ Run database migrations:
```bash
npm run migrate
```
#### 🌱 Seed the database:
```bash
node 002_seed_data.js
```
#### ▶️ Start the backend server:
```bash
npm start
```
The backend will run on `http://localhost:5000/api`.

---

### 3️⃣ **Frontend Setup**
#### 📂 Navigate to the frontend folder:
```bash
cd ../frontend
```
#### 📦 Install dependencies:
```bash
npm install
```
#### 🔑 Set up environment variables:
Create a `.env` file in `frontend/` and add:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
#### ▶️ Start the frontend app:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

### 4️⃣ **Run PostgreSQL using Docker**
#### 🐳 Make sure Docker Desktop is installed.
#### ▶️ Start the database using Docker Compose:
```bash
cd backend
docker-compose up -d
```
This will start a PostgreSQL instance with the required credentials.

To stop the container:
```bash
docker-compose down
```

---

### 5️⃣ **Run the ETL Script (Python)**
#### 📂 Navigate to the ETL folder:
```bash
cd backend/etl
```
#### 📦 Install dependencies:
First, create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows
```
Then install dependencies:
```bash
pip install -r requirements.txt
```
#### ▶️ Run the ETL script:
```bash
python etl_script.py
```
This will fetch city data, transform it, and insert it into the `locations` table.

---

## 📡 API Endpoints
### 1️⃣ **Retrieve Location-Brand-Platform Data**
**GET `/api/location-brand-platforms`**
Returns a list of joined data (location, brand, platform, status, commission rate).

### 2️⃣ **Add a New Location-Brand-Platform Entry**
**POST `/api/location-brand-platforms`**
Body:
```json
{
  "location_id": "uuid",
  "brand_id": "uuid",
  "platform_id": "uuid",
  "status": "active",
  "commission_rate": 15.5
}
```

🔒 **Authentication Required**

---

## ⚡ SQL Query Optimization
To get the count of `location_brand_platforms` entries for a specific `location_id` and date range:
```sql
SELECT COUNT(*) FROM location_brand_platforms
WHERE location_id = $1
AND created_at BETWEEN $2 AND $3;
```
### 🔹 Indexing for Large Datasets
- **Composite Index** on (`location_id`, `created_at`) for faster queries.
- **Partitioning** based on date ranges for efficient lookups.
- **Partial Index** if queries focus on `active` records.

---

## 📝 Additional Notes
- Ensure **Docker Desktop is running** before using `docker-compose`.
- The `.env` files should not be committed to Git.
- Use **Postman** or **cURL** to test the API endpoints.
- Use **pgAdmin** or `psql` to verify database entries.

---

## 💡 Contributors
- **Muhammad Talha** 🚀

---

### ✅ Project is now ready to run! 🎉

