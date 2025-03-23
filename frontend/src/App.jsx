import { useState } from "react";
import Login from "../components/Login";
import FetchData from "../components/FetchData";
import PostData from "../components/PostData";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const handleLogin = (token) => {
        setIsLoggedIn(!!token);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Technical Test by Talha</h1>
            {!isLoggedIn && <Login onLogin={handleLogin} />}
            <div className="space-y-4 mt-6 w-full max-w-lg">
                <FetchData />
                {isLoggedIn && <PostData />}
            </div>
        </div>
    );
}

export default App;
