import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function FetchData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/location-brand-platforms`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Fetch Data</h2>
            <button 
                onClick={handleFetch} 
                className="bg-green-600 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Loading..." : "Fetch Data"}
            </button>

            {data.length > 0 && (
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Country</th>
                                <th className="border border-gray-300 px-4 py-2">City</th>
                                <th className="border border-gray-300 px-4 py-2">Brand</th>
                                <th className="border border-gray-300 px-4 py-2">Platform</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Commission Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{item.country_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.city}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.brand_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.platform_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.commission_rate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default FetchData;
