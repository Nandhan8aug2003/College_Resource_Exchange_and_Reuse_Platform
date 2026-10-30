import { useEffect, useState } from "react";
import "./AdminPage.css";
import {API_BASE_URL} from "../config";

function AdminPage() {
    const [students, setStudents] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("PENDING");
    const [search, setSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/students/admin/pending`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                return response.json();
            })
            .then(data => setStudents(data))
            .catch(error => console.error(error));
    }, []);

    const filteredStudents = students.filter(student => {
        const matchesStatus = selectedStatus === "PENDING";

        const fullName = `${student.firstName} ${student.lastName}`;

        const matchesSearch =
            fullName.toLowerCase().includes(search.toLowerCase()) ||
            student.usn.toLowerCase().includes(search.toLowerCase()) ||
            student.collegeEmail.toLowerCase().includes(search.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    const statusOptions = [
        { label: "PENDING", value: "PENDING" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "REJECTED", value: "REJECTED" }
    ];

    return (
        <div className="admin-page">

            <h1>Admin Dashboard</h1>

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card">
                    <h3>Pending</h3>
                    <p>{students.length}</p>
                </div>

                <div className="summary-card">
                    <h3>Accepted</h3>
                    <p>0</p>
                </div>

                <div className="summary-card">
                    <h3>Rejected</h3>
                    <p>0</p>
                </div>
            </div>

            {/* Main Layout */}
            <div className="admin-content">

                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <h3>Registrations</h3>

                    {statusOptions.map(status => (
                        <button
                            key={status.value}
                            className={
                                selectedStatus === status.value
                                    ? "status-button active"
                                    : "status-button"
                            }
                            onClick={() => setSelectedStatus(status.value)}
                        >
                            {status.label}
                        </button>
                    ))}
                </aside>

                {/* Student Section */}
                <main className="student-section">

                    <div className="student-section-header">
                        <h2>
                            {statusOptions.find(
                                status => status.value === selectedStatus
                            ).label} Students
                        </h2>

                        <input
                            type="text"
                            placeholder="Search by name, USN or email..."
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                        />
                    </div>

                    <div className="student-list">

                        {filteredStudents.length > 0 ? (
                            filteredStudents.map(student => (
                                <div
                                    className="student-card"
                                    key={student.studentId}
                                >
                                    <div className="student-details">
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {student.firstName} {student.lastName}
                                        </p>

                                        <p>
                                            <strong>USN:</strong> {student.usn}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {student.collegeEmail}
                                        </p>

                                        <p>
                                            <strong>Phone:</strong>{" "}
                                            {student.phoneNumber}
                                        </p>

                                        <p>
                                            <strong>Department:</strong>{" "}
                                            {student.department}
                                        </p>
                                    </div>

                                    <img
                                        className="student-id-card"
                                        src={`${API_BASE_URL}/api/students/admin/${student.studentId}/id-card`}
                                        alt="College ID Card"
                                        onClick={event =>
                                            setSelectedImage(event.currentTarget.src)
                                        }
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="no-students">
                                No students found.
                            </p>
                        )}

                    </div>
                </main>
            </div>

            {/* Enlarged ID Card */}
            {selectedImage && (
                <div
                    className="image-overlay"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="close-button"
                        onClick={() => setSelectedImage(null)}
                    >
                        &times;
                    </button>

                    <img
                        src={selectedImage}
                        alt="Enlarged College ID Card"
                        className="enlarged-image"
                        onClick={event => event.stopPropagation()}
                    />
                </div>
            )}

        </div>
    );
}

export default AdminPage;