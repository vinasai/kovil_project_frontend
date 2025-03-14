import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        const endpoint = isRegister ? "register" : "login";
        const payload = { email: email.trim(), password: password.trim() };

        if (isRegister && !role) {
            setError("Please select a role");
            return;
        }
        if (isRegister) payload.role = role;

        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/${endpoint}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                const userRole = isRegister ? role : response.data.role;
                localStorage.setItem("userRole", userRole);

                if (isRegister) {
                    setIsRegister(false);
                    setEmail("");
                    setPassword("");
                    setRole("");
                    alert("Registration successful! Please login.");
                } else {
                    navigate(userRole === "user" ? "/user" : "/admin-dashboard");
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh", 
            background: "#ffe6e6" 
        }}>
            <div style={{ 
                width: "400px", 
                padding: "20px", 
                borderRadius: "10px", 
                background: "#fff", 
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                textAlign: "center" 
            }}>
                <h2>{isRegister ? "Register" : "Login"}</h2>
                {error && <div style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        required 
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
                    />
                    {isRegister && (
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            required 
                            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">user</option>
                        </select>
                    )}
                    <button 
                        type="submit" 
                        style={{ padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
                <p style={{ marginTop: "15px" }}>
                    {isRegister ? "Already have an account? " : "Don't have an account? "}
                    <span 
                        onClick={() => setIsRegister(!isRegister)} 
                        style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                    >
                        {isRegister ? "Login" : "Register"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
