import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const adminUser = process.env.POSTGRES_USER;
        const adminPass = process.env.POSTGRES_PASSWORD;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

       
        if (username === adminUser && password === adminPass) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "48h" });
            return res.json({ token });
        }

        return res.status(401).json({ error: "Invalid credentials" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
