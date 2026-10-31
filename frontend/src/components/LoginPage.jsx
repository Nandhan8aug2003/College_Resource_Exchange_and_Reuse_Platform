import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import "./LoginPage.css";
import studentLogo from '../assets/logoofstudents.jpg';

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

            if (
                result.roleType === "ADMIN" &&
                result.message === "Login successful"
            ) {
                navigate("/admin");
            }

        } catch (error) {
            setMessage("Could not connect to the server.");
        }
    }

    return (
        <div className="login-page">

            {/* Left Section */}
            <div className="login-left">

                <h2 className="brand-name">
                    <span>♻</span> REUSEHUB
                </h2>

                <h1>
                    Share what you have.
                    <br />
                    <span>Find what you need.</span>
                </h1>

                <ul className="login-features">
                    <li>Calculators, lab kits, IoT & electronic parts</li>
                    <li>Sell, donate or lend within your college</li>
                    <li>Spend less, waste less</li>
                </ul>

                <div className="login-illustration">
                    {/* Add your image here */}
                    <img
                        src={studentLogo}
                        alt="Students sharing resources"
                    />
                </div>

            </div>

            {/* Right Section */}
            <div className="login-right">

                <div className="login-card">
                    <h2>Login</h2>
                     <p className="login-subtitle">
                        Welcome back to your campus exchange.
                    </p>
                    

                    <form onSubmit={handleSubmit}>

                        <label>Login id</label>
                        <input
                            type="text"
                            name="loginId"
                            value={loginId}
                            onChange={(event) =>
                                setLoginId(event.target.value)
                            }
                            required
                        />

                        <div className="password-label">
                            <label>Password</label>
                        </div>

                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                        <button type="submit">Login</button>

                        <p className="login-message">{message}</p>

                    </form>

                    <p className="register-link">
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;