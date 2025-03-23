import pool from "../config/db.js";

const seedQuery = `
INSERT INTO locations (id, country_name, city) VALUES
  (uuid_generate_v4(), 'United States', 'New York'),
  (uuid_generate_v4(), 'United Kingdom', 'London');

INSERT INTO brands (id, brand_name) VALUES
  (uuid_generate_v4(), 'Ghost Burgers'),
  (uuid_generate_v4(), 'Phantom Pizzas');

INSERT INTO delivery_platforms (id, platform_name) VALUES
  (uuid_generate_v4(), 'UberEats'),
  (uuid_generate_v4(), 'Deliveroo');

INSERT INTO location_brand_platforms (id, location_id, brand_id, platform_id, operating_hours, status, commission_rate) 
VALUES 
  (uuid_generate_v4(), 
    (SELECT id FROM locations WHERE country_name='United States' AND city='New York'),
    (SELECT id FROM brands WHERE brand_name='Ghost Burgers'),
    (SELECT id FROM delivery_platforms WHERE platform_name='UberEats'),
    '{"Monday": "9AM-10PM", "Tuesday": "9AM-10PM"}'::jsonb,
    'Active', 
    15.00
  );
`;

async function seedDatabase() {
  const client = await pool.connect();
  try {
    await client.query(seedQuery);
    console.log("Seed data inserted successfully!");
  } catch (err) {
    console.error("Seeding  data failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
