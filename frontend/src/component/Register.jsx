import { useState } from 'react'
import './Register.css'
import logo from '../assets/logo.png'
import campusBg from '../assets/home-placement-bg.jpg'
import { API_BASE_URL } from '../apiConfig'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    usn: '',
    collegeEmail: '',
    phoneNumber: '',
    password: '',
  })

  const [message, setMessage] = useState('')

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      const result = await response.text()

      if (response.ok) {
        setMessage(result)
      } else {
        setMessage('Registration failed: ' + result)
      }
    } catch {
      setMessage('Unable to connect to the backend.')
    }
  }

  return (
    <div
      className="register-page"
      style={{ backgroundImage: `url(${campusBg})` }}
    >
      <header className="register-header">
        <img src={logo} alt="BMS Institute of Technology and Management" />
      </header>

      <main className="register-content">
        <form className="register-card" onSubmit={handleSubmit}>
          <h1>Resource Exchange</h1>
          <p>Create your account to get started</p>

          <div className="register-name-row">
            <div className="register-field">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName"
                value={formData.firstName} onChange={handleChange}
                placeholder="Enter your first name" required />
            </div>

            <div className="register-field">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName"
                value={formData.lastName} onChange={handleChange}
                placeholder="Enter your last name" required />
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="usn">USN</label>
            <input id="usn" name="usn"
              value={formData.usn} onChange={handleChange}
              placeholder="Enter your USN" required />
          </div>

          <div className="register-field">
            <label htmlFor="collegeEmail">College Email</label>
            <input id="collegeEmail" name="collegeEmail" type="email"
              value={formData.collegeEmail} onChange={handleChange}
              placeholder="Enter your college email" required />
          </div>

          <div className="register-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input id="phoneNumber" name="phoneNumber" type="tel"
              value={formData.phoneNumber} onChange={handleChange}
              placeholder="Enter your phone number" required />
          </div>

          <div className="register-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"
              value={formData.password} onChange={handleChange}
              placeholder="Enter your password" required />
          </div>

          {message && <p id='message'>{message}</p>}

          <button type="submit">Register</button>

          <div className="register-footer">
            Already have an account? <a href=".">Login here</a>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Register