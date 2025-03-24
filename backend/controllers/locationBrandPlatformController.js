import pool from "../config/db.js";
// import LocationBrandPlatform from "../migrations/LocationBrandPlatform.js";
// import { authenticateJWT } from "../middleware/authMiddleware.js";
export const getLocationBrandPlatforms = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                lbp.id, 
                l.country_name AS country_name, 
                l.city AS city,
                b.brand_name AS brand_name, 
                dp.platform_name AS platform_name, 
                lbp.status, 
                lbp.commission_rate
            FROM location_brand_platforms lbp
            JOIN locations l ON lbp.location_id = l.id
            JOIN brands b ON lbp.brand_id = b.id
            JOIN delivery_platforms dp ON lbp.platform_id = dp.id
        `);

        
        const rows = result.rows;

        if (!rows || rows.length === 0) {
            console.log("No records found");
            return res.status(404).json({ message: "No records found" });
        }

        console.log("Query executed successfully. Rows returned:", rows.length);
        res.json(rows);

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};



export const addLocationBrandPlatform = async (req, res) => {
    try {
        const { country_name, city, brand_name, platform_name, operating_hours, status, commission_rate } = req.body;

        if (!country_name || !city || !brand_name || !platform_name || !status || !commission_rate) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        let locationQuery = await pool.query(
            `SELECT id FROM locations WHERE country_name = $1 AND city = $2`, 
            [country_name, city]
        );

        let location_id;
        if (locationQuery.rows.length === 0) {
            const newLocation = await pool.query(
                `INSERT INTO locations (id, country_name, city) VALUES (gen_random_uuid(), $1, $2) RETURNING id`, 
                [country_name, city]
            );
            location_id = newLocation.rows[0].id;
            console.log(`New location inserted: ${location_id}`);
        } else {
            location_id = locationQuery.rows[0].id;
            console.log(`Existing location found: ${location_id}`);
        }

    
        let brandQuery = await pool.query(
            `SELECT id FROM brands WHERE brand_name = $1`, 
            [brand_name]
        );

        let brand_id;
        if (brandQuery.rows.length === 0) {
            const newBrand = await pool.query(
                `INSERT INTO brands (id, brand_name) VALUES (gen_random_uuid(), $1) RETURNING id`, 
                [brand_name]
            );
            brand_id = newBrand.rows[0].id;
            console.log(`New brand inserted: ${brand_id}`);
        } else {
            brand_id = brandQuery.rows[0].id;
            console.log(`Existing brand found: ${brand_id}`);
        }

    
        let platformQuery = await pool.query(
            `SELECT id FROM delivery_platforms WHERE platform_name = $1`, 
            [platform_name]
        );

        let platform_id;
        if (platformQuery.rows.length === 0) {
            const newPlatform = await pool.query(
                `INSERT INTO delivery_platforms (id, platform_name) VALUES (gen_random_uuid(), $1) RETURNING id`, 
                [platform_name]
            );
            platform_id = newPlatform.rows[0].id;
            console.log(`New platform inserted: ${platform_id}`);
        } else {
            platform_id = platformQuery.rows[0].id;
            console.log(`Existing platform found: ${platform_id}`);
        }

        const existingRecord = await pool.query(
            `SELECT * FROM location_brand_platforms 
            WHERE location_id = $1 AND brand_id = $2 AND platform_id = $3`,
            [location_id, brand_id, platform_id]
        );

        if (existingRecord.rows.length > 0) {
            console.log("Duplicate entry found, aborting insert.");
            return res.status(400).json({ error: "Duplicate entry found" });
        }

        const result = await pool.query(
            `INSERT INTO location_brand_platforms 
            (id, location_id, brand_id, platform_id, operating_hours, status, commission_rate) 
            VALUES (gen_random_uuid(), $1, $2, $3, $4::jsonb, $5, $6) RETURNING *`,
            [location_id, brand_id, platform_id, JSON.stringify(operating_hours), status, commission_rate]
        );

        console.log(`New location_brand_platform record inserted: ${result.rows[0].id}`);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
