//named import
//useState function helps component to remember the changing data
import { useState } from "react";
import "../components/RegisterPage.css";
import { API_BASE_URL } from "../config";

function RegisterPage() {
    //array destructuring
    //useState returns array with two values 
    //react calls register component and exicutes useState function
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        usn: "",
        collegeEmail: "",
        phoneNumber: "",
        department: "",
        collegeIdCard: "",
        password: "",
    });
    const [collegeIdCard, setCollegeIdCard] = useState(null);
    const [message, setMessage] = useState("");

    //event js obj when any action happend in browser it create js obj
    function handleChange(event) {
        //obj destructuring
        const { name, value } = event.target;

        setFormData({
            //spread operator includes all existing fields
            ...formData,
            //[ ] taking value from input name attribute
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        //to avoid page render
        event.preventDefault();
        setMessage("Registering...");

        //browser built in FormData api
        const data = new FormData();

        //built in js method 
        //it can use .forEach obj like formData cannot 
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "collegeIdCard") {
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
        <div className="container">
            <div>
                <h2>Student Registration</h2>

                {/* multipart/form-data as both text and file upload */}
                <form onSubmit={handleSubmit}>
                    <input name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required />
                    <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    <input name="usn" placeholder="USN" value={formData.usn} onChange={handleChange} required />
                    <input name="collegeEmail" type="email" placeholder="College Email" value={formData.collegeEmail} onChange={handleChange} required />
                    <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                    <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                    <input
                        name="collegeIdCard"
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            setCollegeIdCard(event.target.files[0])
                        }
                        required
                    />
                    <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                    <button type="submit">Register</button>

                    <p>{message}</p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;