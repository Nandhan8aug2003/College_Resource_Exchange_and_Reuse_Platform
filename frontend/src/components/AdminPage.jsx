import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import { API_BASE_URL } from "../config";

function AdminPage() {
    const [students, setStudents] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("PENDING");
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Convert Base64 image into a browser-readable image URL
    function getIdCardImage(image) {
        if (!image) return "";

        // Remove whitespace from Base64 data
        const cleanImage = image.replace(/\s/g, "");

        // If image already contains a data URL, use it directly
        if (cleanImage.startsWith("data:image/")) {
            return cleanImage;
        }

        // Detect image type from Base64 signature
        let imageType = "image/jpeg";

        if (cleanImage.startsWith("iVBOR")) {
            imageType = "image/png";
        } else if (cleanImage.startsWith("R0lGOD")) {
            imageType = "image/gif";
        }

        return `data:${imageType};base64,${cleanImage}`;
    }

    // Fetch pending students from backend
    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/students/admin/status/PENDING`
                );

                if (!response.ok) {
                    throw new Error("Could not fetch students.");
                }

                const data = await response.json();

                setStudents(
                    data.map(student => ({
                        ...student,
                        status: "PENDING"
                    }))
                );
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchStudents();
    },[]);

    // Search students
    const filteredStudents = students.filter(student => {
        const fullName =
            `${student.firstName || ""} ${student.lastName || ""}`.toLowerCase();

        const searchValue = search.toLowerCase();

        const matchesSearch =
            fullName.includes(searchValue) ||
            (student.usn || "").toLowerCase().includes(searchValue) ||
            (student.collegeEmail || "").toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "DASHBOARD" ||
            selectedStatus === "ALL" ||
            student.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Approve student locally until backend API is ready
    function handleApprove(student) {
        setStudents(previousStudents =>
            previousStudents.map(item =>
                item.loginId === student.loginId
                    ? { ...item, status: "APPROVED" }
                    : item
            )
        );

        setSelectedStudent(null);
    }

    // Reject student locally until backend API is ready
    function handleReject(student) {
        setStudents(previousStudents =>
            previousStudents.map(item =>
                item.loginId === student.loginId
                    ? { ...item, status: "REJECTED" }
                    : item
            )
        );

        setSelectedStudent(null);
    }

    function handleLogout() {
        navigate("/login");
    }

    const counts = {
        ALL: students.length,
        PENDING: students.filter(student => student.status === "PENDING").length,
        APPROVED: students.filter(student => student.status === "APPROVED").length,
        REJECTED: students.filter(student => student.status === "REJECTED").length
    };

    const menuItems = [
        { label: "Total Registered", value: "ALL", },
        { label: "Pending", value: "PENDING", },
        { label: "Approved", value: "APPROVED", },
        { label: "Rejected", value: "REJECTED", }
    ];

    function getSectionTitle() {
        if (selectedStatus === "ALL") return "All Registered Students";
        if (selectedStatus === "PENDING") return "Pending Students";
        if (selectedStatus === "APPROVED") return "Approved Students";
        if (selectedStatus === "REJECTED") return "Rejected Students";

        return "Students";
    }

    function getInitials(student) {
        return `${student.firstName?.[0] || ""}${student.lastName?.[0] || ""}`;
    }

    function formatDate(date) {
        return date
            ? new Date(date).toLocaleDateString("en-GB")
            : "—";
    }

    return (
        <div className="admin-layout">

            {/* SIDEBAR */}
            <aside className="admin-sidebar">

                <div className="admin-brand">
                    <span className="brand-icon">♻</span>
                    REUSEHUB
                </div>

                <p className="sidebar-heading">STUDENTS</p>

                <nav className="sidebar-menu">
                    {menuItems.map(item => (
                        <button
                            key={item.value}
                            className={`sidebar-item ${selectedStatus === item.value ? "active" : ""
                                }`}
                            onClick={() => setSelectedStatus(item.value)}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            {item.label}

                            {item.value !== "DASHBOARD" && (
                                <small>
                                    {item.value === "ALL"
                                        ? counts.ALL
                                        : counts[item.value]}
                                </small>
                            )}
                        </button>
                    ))}
                </nav>

                <button className="logout-button" onClick={handleLogout}>
                    <span>⇥</span>
                    Logout
                </button>

            </aside>

            {/* MAIN CONTENT */}
            <main className="admin-main">

                <header className="admin-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>
                            Verify student identities and manage registrations.
                        </p>
                    </div>

                    <input
                        className="admin-search"
                        type="text"
                        placeholder="⌕  Search by name or USN"
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </header>

                {/* STUDENT SECTION */}
                <section className="student-section">

                    <div className="section-heading">
                        <div>
                            <h2>{getSectionTitle()}</h2>
                            <p>
                                {filteredStudents.length} student
                                {filteredStudents.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="student-empty">
                            Loading students...
                        </div>
                    ) : error ? (
                        <div className="student-empty error-message">
                            {error}
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="student-empty">
                            No students found in this category.
                        </div>
                    ) : (
                        <div className="student-card-grid">

                            {filteredStudents.map(student => (
                                <article
                                    className="student-card"
                                    key={student.studentId}
                                >

                                    <div className="student-card-top">
                                        <div className="student-avatar">
                                            {getInitials(student)}
                                        </div>

                                        <span
                                            className={`status-badge ${student.status.toLowerCase()}`}
                                        >
                                            {student.status}
                                        </span>
                                    </div>

                                    <div className="student-card-info">
                                        <h3>
                                            {student.firstName} {student.lastName}
                                        </h3>

                                        <p>{student.collegeEmail}</p>
                                    </div>

                                    <div className="student-card-details">
                                        <div>
                                            <span>USN</span>
                                            <strong>{student.loginId}</strong>
                                        </div>

                                        <div>
                                            <span>Department</span>
                                            <strong>{student.department}</strong>
                                        </div>

                                        <div>
                                            <span>Registered</span>
                                            <strong>
                                                {student.registeredAt}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="student-card-actions">

                                        <button
                                            className="view-button"
                                            onClick={() => setSelectedStudent(student)}
                                        >
                                            View Details
                                        </button>

                                        {student.status === "PENDING" && (
                                            <>
                                                <button
                                                    className="approve-button"
                                                    onClick={() => handleApprove(student)}
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="reject-button"
                                                    onClick={() => handleReject(student)}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                    </div>

                                </article>
                            ))}

                        </div>
                    )}

                </section>

            </main>

            {/* STUDENT DETAILS MODAL */}
            {selectedStudent && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelectedStudent(null)}
                >
                    <div
                        className="student-modal"
                        onClick={event => event.stopPropagation()}
                    >

                        <button
                            className="modal-close"
                            onClick={() => setSelectedStudent(null)}
                        >
                            ×
                        </button>

                        <div className="modal-heading">
                            <h2>
                                {selectedStudent.firstName}{" "}
                                {selectedStudent.lastName}
                            </h2>

                            <span
                                className={`status-badge ${selectedStudent.status.toLowerCase()}`}
                            >
                                {selectedStudent.status}
                            </span>
                        </div>

                        <div className="modal-content">

                            <div className="modal-details">

                                <div>
                                    <label>First Name</label>
                                    <p>{selectedStudent.firstName}</p>
                                </div>

                                <div>
                                    <label>Last Name</label>
                                    <p>{selectedStudent.lastName}</p>
                                </div>

                                <div>
                                    <label>USN</label>
                                    <p>{selectedStudent.loginId}</p>
                                </div>

                                <div>
                                    <label>College Email</label>
                                    <p>{selectedStudent.collegeEmail}</p>
                                </div>

                                <div>
                                    <label>Phone Number</label>
                                    <p>{selectedStudent.phoneNumber}</p>
                                </div>

                                <div>
                                    <label>Department</label>
                                    <p>{selectedStudent.department}</p>
                                </div>

                                <div>
                                    <label>Registered Date</label>
                                    <p>{selectedStudent.registeredAt}</p>
                                </div>

                            </div>

                            {/* COLLEGE ID CARD */}
                            <div className="modal-id-card">

                                {selectedStudent.idCardimage ? (
                                    <img
                                        src={`data:image/jpeg;base64,${selectedStudent.idCardimage}`}
                                        alt="College ID Card"
                                    />
                                ) : (
                                    <p>ID card image is unavailable.</p>
                                )}
                            </div>

                        </div>

                        {selectedStudent.status === "PENDING" && (
                            <div className="modal-actions">

                                <button
                                    className="reject-button"
                                    onClick={() => handleReject(selectedStudent)}
                                >
                                    Reject Student
                                </button>

                                <button
                                    className="approve-button"
                                    onClick={() => handleApprove(selectedStudent)}
                                >
                                    Approve Student
                                </button>

                            </div>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminPage;