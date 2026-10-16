import { useState } from 'react'
import './login.css'

function Login() {
  const [usn, setUsn] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    console.log('USN:', usn)
    console.log('Login form submitted')
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
      </form>
    </div>
  )
}

export default Login