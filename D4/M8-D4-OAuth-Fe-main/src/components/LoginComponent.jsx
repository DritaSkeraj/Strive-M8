import React from "react"
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const LoginComponent = (props) => {
  const [email, setEmail] = useState("test@test.com")
  const [password, setPassword] = useState("test12345")
  const history = useHistory()

  const login = async ()=> {
    const res = await axios("http://localhost:3001/users/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email, password
      }, withCredentials: true // use cookies
    })

    localStorage.setItem("accessToken", res.data.accessToken)
  }

  return (
    <div className="App">
      <header className="App-header">
      <input
          type="text"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="*********"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <input type="button" onClick={login} value="Login"></input>
        <a href="http://localhost:3001/users/googleLogin"><button>Sign in with Google!</button></a>
      </header>
    </div>
  )
}

export default LoginComponent