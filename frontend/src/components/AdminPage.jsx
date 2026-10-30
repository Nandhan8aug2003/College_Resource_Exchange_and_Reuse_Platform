
import { useEffect, useState } from "react";
import "./AdminPage.css";
import { API_BASE_URL } from "../config";

function AdminPage() {
    const [students, setStudents] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("PENDING");
    const [search, setSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch pending students
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

    // Search students
    const filteredStudents = students.filter(student => {
        const fullName =
            `${student.firstName} ${student.lastName}`.toLowerCase();

        const searchValue = search.toLowerCase();

        const matchesSearch =
            fullName.includes(searchValue) ||
            student.usn.toLowerCase().includes(searchValue) ||
            student.collegeEmail.toLowerCase().includes(searchValue);

        return matchesSearch;
    });

    const statusOptions = [
        { label: "Pending", value: "PENDING" },
        { label: "Approved", value: "APPROVED" },
        { label: "Rejected", value: "REJECTED" }
    ];

    return (
        <div className="admin-page">

            {/* Dashboard Heading */}
            <h1>Admin Dashboard</h1>

            {/* Summary Cards */}
            <div className="summary-cards">

                <div className="summary-card pending-card">
                    <div>
                        <h3>Pending</h3>
                        <p>{students.length}</p>
                    </div>
                    <span>♙</span>
                </div>

                <div className="summary-card approved-card">
                    <div>
                        <h3>Approved</h3>
                        <p>0</p>
                    </div>
                    <span>✓</span>
                </div>

                <div className="summary-card rejected-card">
                    <div>
                        <h3>Rejected</h3>
                        <p>0</p>
                    </div>
                    <span>⊘</span>
                </div>

            </div>

            {/* Status Tabs and Search */}
            <div className="student-section-header">

                <div className="status-tabs">
                    {statusOptions.map(status => (
                        <button
                            key={status.value}
                            className={
                                selectedStatus === status.value
                                    ? "status-tab active"
                                    : "status-tab"
                            }
                            onClick={() => setSelectedStatus(status.value)}
                        >
                            {status.label}
                        </button>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Search by name, USN or email..."
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />

            </div>

            {/* Student List */}
            <div className="student-list">

                {selectedStatus === "PENDING" &&
                filteredStudents.length > 0 ? (

                    filteredStudents.map(student => (
                        <div
                            className="student-card"
                            key={student.studentId}
                        >

                            <div className="student-details">
                                <h3>
                                    {student.firstName} {student.lastName}
                                </h3>

                                <p>
                                    <strong>USN:</strong> {student.usn}
                                </p>

                                <p>
                                    <strong>Email:</strong> {student.collegeEmail}
                                </p>

                                <p>
                                    <strong>Phone:</strong> {student.phoneNumber}
                                </p>

                                <p>
                                    <strong>Department:</strong> {student.department}
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

                    <div className="no-students">
                        <div className="empty-icon">📂</div>

                        <h3>No students found.</h3>

                        <p>
                            There are currently no registration requests
                            in this category.
                        </p>
                    </div>

                )}

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
