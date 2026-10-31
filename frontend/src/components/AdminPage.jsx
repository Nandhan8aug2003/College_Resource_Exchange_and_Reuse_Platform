import { useEffect, useState } from "react";
import "./AdminPage.css";
import { API_BASE_URL } from "../config";

function AdminPage() {
    const [students, setStudents] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("PENDING");
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

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

        return (
            fullName.includes(searchValue) ||
            student.usn.toLowerCase().includes(searchValue) ||
            student.collegeEmail.toLowerCase().includes(searchValue)
        );
    });

    // Sidebar options
    const menuItems = [
        { label: "Dashboard", value: "DASHBOARD", icon: "▦", count: null },
        { label: "Total Registered", value: "ALL", icon: "♙", count: 0 },
        { label: "Pending", value: "PENDING", icon: "◷", count: students.length },
        { label: "Approved", value: "APPROVED", icon: "✓", count: 0 },
        { label: "Rejected", value: "REJECTED", icon: "⊗", count: 0 }
    ];

    // Current table title
    const getTableTitle = () => {
        if (selectedStatus === "ALL") return "All Registered Students";
        if (selectedStatus === "PENDING") return "Pending Students";
        if (selectedStatus === "APPROVED") return "Approved Students";
        if (selectedStatus === "REJECTED") return "Rejected Students";
        return "Student Registrations";
    };

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
                            className={`sidebar-item ${
                                selectedStatus === item.value ? "active" : ""
                            }`}
                            onClick={() => setSelectedStatus(item.value)}
                        >
                            {/* <span className="sidebar-icon">{item.icon}</span> */}

                            {item.label}

                            {item.count !== null && (
                                <small>
                                    {item.value === "PENDING"
                                        ? students.length
                                        : item.count}
                                </small>
                            )}
                        </button>
                    ))}
                </nav>

                <button className="logout-button">
                    <span>⇥</span>
                    Logout
                </button>

            </aside>

            {/* MAIN CONTENT */}
            <main className="admin-main">

                {/* HEADER */}
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

                {/* TABLE SECTION */}
                <section className="student-section">

                    <div className="table-heading">
                        <h2>{getTableTitle()}</h2>
                    </div>

                    <div className="student-table-container">
                        <table className="student-table">

                            <thead>
                                <tr>
                                    <th>STUDENT</th>
                                    <th>USN</th>
                                    <th>DEPARTMENT</th>
                                    <th>REGISTERED</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {selectedStatus === "PENDING" &&
                                filteredStudents.length > 0 ? (

                                    filteredStudents.map(student => (
                                        <tr key={student.studentId}>

                                            <td>
                                                <div className="table-student">
                                                    <div className="student-avatar">
                                                        {student.firstName[0]}
                                                        {student.lastName[0]}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            {student.firstName}{" "}
                                                            {student.lastName}
                                                        </strong>

                                                        <span>
                                                            {student.collegeEmail}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>{student.usn}</td>

                                            <td>{student.department}</td>

                                            <td>
                                                {student.createdAt
                                                    ? new Date(student.createdAt)
                                                        .toLocaleDateString("en-GB")
                                                    : "—"}
                                            </td>

                                            <td>
                                                <span className="status-badge pending">
                                                    Pending
                                                </span>
                                            </td>

                                            <td>
                                                <div className="table-actions">

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            setSelectedStudent(student)
                                                        }
                                                    >
                                                        <span>◎</span>
                                                        View
                                                    </button>

                                                    <button
                                                        className="approve-button"
                                                        disabled
                                                        title="Approval functionality will be added later"
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        className="reject-button"
                                                        disabled
                                                        title="Rejection functionality will be added later"
                                                    >
                                                        Reject
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="6" className="empty-table">
                                            No students found in this category.
                                        </td>
                                    </tr>

                                )}
                            </tbody>

                        </table>
                    </div>

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

                            <span className="status-badge pending">
                                Pending
                            </span>
                        </div>

                        <div className="modal-content">

                            <div className="modal-details">

                                <div>
                                    <label>USN</label>
                                    <p>{selectedStudent.usn}</p>
                                </div>

                                <div>
                                    <label>College Email</label>
                                    <p>{selectedStudent.collegeEmail}</p>
                                </div>

                                <div>
                                    <label>Phone</label>
                                    <p>{selectedStudent.phoneNumber}</p>
                                </div>

                                <div>
                                    <label>Department</label>
                                    <p>{selectedStudent.department}</p>
                                </div>

                                <div>
                                    <label>Registered</label>
                                    <p>
                                        {selectedStudent.createdAt
                                            ? new Date(selectedStudent.createdAt)
                                                .toLocaleDateString("en-GB")
                                            : "—"}
                                    </p>
                                </div>

                            </div>

                            <div className="modal-id-card">
                                <label>College ID Card</label>

                                <img
                                    src={`${API_BASE_URL}/api/students/admin/${selectedStudent.studentId}/id-card`}
                                    alt="College ID Card"
                                />
                            </div>

                        </div>

                        <div className="modal-actions">
                            <button
                                className="reject-button"
                                disabled
                            >
                                Reject
                            </button>

                            <button
                                className="approve-button"
                                disabled
                            >
                                Approve
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminPage;