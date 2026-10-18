import { useState } from 'react'
import './Login.css'
import Dashboard from './Dashboard'

function Login() {
  const [usn, setUsn] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true'
  )

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch('https://college-backend-u5gk.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usn, password })
    })

    const result = await response.text()

    if (result === 'Login successful') {
      sessionStorage.setItem('isLoggedIn','true')
      setIsLoggedIn(true)
    } else {
      setMessage(result)
    }
  }

  if (isLoggedIn) {
    return <Dashboard />
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <label htmlFor="usn">USN</label>
        <input
          id="usn"
          type="text"
          placeholder="Enter your USN"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
        <p>{message}</p>
      </form>
    </div>
  )
}

export default Login