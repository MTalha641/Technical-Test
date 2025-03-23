import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function PostData() {
    const [formData, setFormData] = useState({
        country_name: "",
        city: "",
        brand_name: "",
        platform_name: "",
        operating_hours: "{}",
        status: "",
        commission_rate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
     
        if (name === "operating_hours") {
            try {
                setFormData({ ...formData, [name]: JSON.stringify(JSON.parse(value)) });
            } catch (error) {
                console.error("Invalid JSON format for operating_hours");
                return;
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must log in first!");
            return;
        }

        try {
            await axios.post(`${API_URL}/location-brand-platforms`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Data inserted successfully!");
        } catch (error) {
            console.error("Error posting data:", error);
            alert(error.response?.data?.error || "Failed to insert data");
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Post Data</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="country_name" placeholder="Country" className="p-2 border rounded w-full" onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" className="p-2 border rounded w-full" onChange={handleChange} required />
                <input type="text" name="brand_name" placeholder="Brand" className="p-2 border rounded w-full" onChange={handleChange} required />
                <input type="text" name="platform_name" placeholder="Platform" className="p-2 border rounded w-full" onChange={handleChange} required />
                
                {/* New operating_hours input (expects a JSON string) */}
                <textarea 
                    name="operating_hours"
                    placeholder='Operating Hours (e.g., {"Monday": "9AM-5PM"})' 
                    className="p-2 border rounded w-full"
                    onChange={handleChange}
                    required
                ></textarea>

                <input type="text" name="status" placeholder="Status" className="p-2 border rounded w-full" onChange={handleChange} required />
                <input type="text" name="commission_rate" placeholder="Commission Rate" className="p-2 border rounded w-full" onChange={handleChange} required />
                
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">Submit Data</button>
            </form>
        </div>
    );
}

export default PostData;
