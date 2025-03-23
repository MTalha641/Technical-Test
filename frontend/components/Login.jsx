import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
            localStorage.setItem("token", data.token);
            onLogin(data.token);
            alert("Logged in successfully!");
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Login to POST data</h2>
            <form onSubmit={handleLogin} className="space-y-3">
                <input type="text" name="username" placeholder="Username" className="p-2 border rounded w-full" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="p-2 border rounded w-full" onChange={handleChange} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
            </form>
        </div>
    );
}

export default Login;
