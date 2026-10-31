import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./RegisterPage.css";
import studentLogo from '../assets/logoofstudents.jpg';

function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        usn: "",
        collegeEmail: "",
        phoneNumber: "",
        department: "",
        password: "",
        confirmPassword: "",
    });

    const [collegeIdCard, setCollegeIdCard] = useState(null);
    const [message, setMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (!collegeIdCard) {
            setMessage("Please upload your college ID card.");
            return;
        }

        setMessage("Registering...");

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "confirmPassword") {
                data.append(key, value);
            }
        });

        data.append("collegeIdCard", collegeIdCard);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/students/register`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await response.text();
            setMessage(result);

        } catch (error) {
            setMessage("Could not connect to the server.");
        }
    }

    return (
        <div className="register-page">

            {/* Left Section */}
            <div className="register-left">

                <h2 className="register-brand">
                    <span>♻</span> REUSEHUB
                </h2>

                <h1>
                    Share what you have.
                    <br />
                    <span>Find what you need.</span>
                </h1>

                <ul className="register-features">
                    <li>Calculators, lab kits, IoT & electronic parts</li>
                    <li>Sell, donate or lend within your college</li>
                    <li>Spend less, waste less</li>
                </ul>

                <div className="register-illustration">
                    <img
                        src={studentLogo}
                        alt="Students sharing resources"
                    />
                </div>

            </div>

            {/* Right Section */}
            <div className="register-right">

                <div className="register-card">

                    <h2>Student Registration</h2>

                    <p className="register-subtitle">
                        Create your student account to get started.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="register-grid">

                            <div className="register-field">
                                <label>First Name</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label>Last Name</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label>USN</label>
                                <input
                                    name="usn"
                                    value={formData.usn}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label>College Email</label>
                                <input
                                    name="collegeEmail"
                                    type="email"
                                    value={formData.collegeEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label>Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label>Department</label>
                                <input
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        {/* College ID Upload */}
                        <label className="upload-box">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    setCollegeIdCard(event.target.files[0])
                                }
                                required
                            />

                            <span className="upload-icon">♧</span>

                            <span className="upload-text">
                                <strong>College ID Card Upload</strong>
                                <small>
                                    {collegeIdCard
                                        ? collegeIdCard.name
                                        : "Drag & drop or click to upload"}
                                </small>
                            </span>

                        </label>

                        {/* Password Fields */}
                        <div className="register-grid">

                            <div className="register-field">
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="register-button">
                            Register
                        </button>

                        <p className="register-message">{message}</p>

                    </form>

                    <p className="login-link">
                        Already registered?
                        <Link to="/login"> Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default RegisterPage;