
import { useState } from 'react'
import './Login.css'
import logo from '../assets/logo.png'
import campusBg from '../assets/home-placement-bg.jpg'
import { API_BASE_URL } from '../apiConfig'

function Login() {
  const [formData, setFormData] = useState({
    usn: '',
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
        `${API_BASE_URL}/api/users/login`,
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
        setMessage('Login failed: ' + result)
      }
    } catch {
      setMessage('Unable to connect to the backend.')
    }
  }

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${campusBg})` }}
    >
      <header className="login-header">
        <img
          src={logo}
          alt="BMS Institute of Technology and Management"
        />
      </header>

      <main className="login-content">
        <form className="login-card" onSubmit={handleSubmit}>
          <h1>Resource Exchange</h1>
          <p>Login to your account</p>

          <div className="login-field">
            <label htmlFor="usn">USN</label>
            <input
              id="usn"
              name="usn"
              value={formData.usn}
              onChange={handleChange}
              placeholder="Enter your USN"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {message && <p id="message">{message}</p>}

          <button type="submit">Login</button>

          <div className="login-footer">
            Don't have an account? <a href="/register">Register here</a>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Login
