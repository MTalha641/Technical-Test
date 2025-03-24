import pool from "../config/db.js";

const migrationQuery = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS delivery_platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS location_brand_platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  platform_id UUID NOT NULL REFERENCES delivery_platforms(id) ON DELETE CASCADE,
  operating_hours JSONB NOT NULL,
  status TEXT NOT NULL, 
  commission_rate DECIMAL(5,2) CHECK (commission_rate >= 0),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_location_brand_platform UNIQUE (location_id, brand_id, platform_id)
);
`;

async function runMigration() {
  const client = await pool.connect();
  try {
    await client.query(migrationQuery);
    console.log("Migration applied successfully");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
