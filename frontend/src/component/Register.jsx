
import { useState } from 'react'
import './Register.css'
import { API_BASE_URL } from '../apiConfig'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    usn: '',
    collegeEmail: '',
    phoneNumber: '',
    department: '',
    password: '',
  })

  const [collegeIdCard, setCollegeIdCard] = useState(null)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!collegeIdCard) {
      setMessage('Please upload your college ID card.')
      return
    }

    const data = new FormData()
    data.append(
      'user',
      new Blob([JSON.stringify(formData)], {
        type: 'application/json',
      })
    )
    data.append('collegeIdCard', collegeIdCard)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register`,
        {
          method: 'POST',
          body: data,
        }
      )

      const result = await response.text()
      setMessage(response.ok ? result : 'Registration failed: ' + result)
    } catch {
      setMessage('Unable to connect to the backend.')
    }
  }

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h1>Student Registration</h1>
        <p>Join the College Resource Exchange</p>

        <div className="name-row">
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="usn">USN</label>
          <input
            id="usn"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="collegeEmail">College Email</label>
          <input
            id="collegeEmail"
            name="collegeEmail"
            type="email"
            value={formData.collegeEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select department</option>
            <option value="CSE">Computer Science</option>
            <option value="ISE">Information Science</option>
            <option value="ECE">Electronics and Communication</option>
            <option value="EEE">Electrical and Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CIVIL">Civil</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="collegeIdCard">College ID Card</label>
          <input
            id="collegeIdCard"
            type="file"
            accept="image/*,.pdf"
            onChange={(event) =>
              setCollegeIdCard(event.target.files[0] || null)
            }
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {message && <p>{message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
