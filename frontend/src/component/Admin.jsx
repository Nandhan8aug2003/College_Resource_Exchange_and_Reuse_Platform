import { useState } from 'react'
import './Admin.css'

function Admin() {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: 'Rahul',
      lastName: 'Sharma',
      usn: '1BM24CS001',
      collegeEmail: 'rahul@example.edu',
      phoneNumber: '9876543210',
      department: 'CSE',
      status: 'Pending',
    },
  ])

  function updateStatus(id, status) {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    )
  }

  const pending = students.filter(
    (student) => student.status === 'Pending'
  ).length

  const accepted = students.filter(
    (student) => student.status === 'Accepted'
  ).length

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Resource Exchange</h1>
        <span>Admin Dashboard</span>
      </header>

      <main className="admin-content">
        <h2>Dashboard Overview</h2>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Pending Registrations</h3>
            <p>{pending}</p>
          </div>

          <div className="stat-card">
            <h3>Accepted Students</h3>
            <p>{accepted}</p>
          </div>

          <div className="stat-card">
            <h3>Resources Listed</h3>
            <p>0</p>
          </div>
        </div>

        <h2>Student Registrations</h2>

        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <div>
              <h3>
                {student.firstName} {student.lastName}
              </h3>

              <p>USN: {student.usn}</p>
              <p>Email: {student.collegeEmail}</p>
              <p>Phone: {student.phoneNumber}</p>
              <p>Department: {student.department}</p>
              <p>Status: {student.status}</p>
            </div>

            <div className="id-card">
              College ID Card
              <p>Will appear after backend integration</p>
            </div>

            {student.status === 'Pending' && (
              <div className="student-actions">
                <button
                  onClick={() => updateStatus(student.id, 'Accepted')}
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(student.id, 'Rejected')}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  )
}

export default Admin