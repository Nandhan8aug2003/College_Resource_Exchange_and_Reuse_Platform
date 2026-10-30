import { Link, useNavigate } from "react-router-dom";
import "../components/RegisterPage.css";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import "../components/RegisterPage.css";

function LoginPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("Logging in...");

        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginId: loginId,
                    password: password,
                }),
            });

            const result = await response.json();
            setMessage(result.message);

            if(result.roleType === "ADMIN" && result.message === "Login successful"){
                navigate("/admin");
            }

        } catch (error) {
            setMessage("Could not connect to the server.");
        }
    }

    // Keep your existing return JSX here.
    return (
        <div className="container">
            <div>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="loginId"
                        value={loginId}
                        placeholder="Login id"
                        onChange={(event)=>setLoginId(event.target.value)}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event)=>setPassword(event.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                    <p>{message}</p>
                    <p>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;