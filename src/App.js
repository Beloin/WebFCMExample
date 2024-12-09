import logo from './logo.svg';
import './App.css';
import { Fun } from './domainfb';
import { useState } from 'react';
import axios from 'axios';

let currentJWT = null;
function App() {
  const [token, setToken] = useState("Invalid Token")
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click to request Token
        </p>
        <button onClick={() => getToken(setToken)}>
          Request Token
        </button>
        <button onClick={() => register(token)}>
          Register in backend
        </button>
        <button onClick={() => testNotfication(token)}>
          Test Notification
        </button>
        <p>{token}</p>
      </header>
    </div>
  );
}

async function getToken(setToken) {
  console.log("Getting Token: ")
  const token = await Fun.getToken()
  console.log(token)
  setToken(token)
  Fun.defineCallback((payload) => {
    console.log(payload)
    alert(payload.notification.body)
  })
}

async function register(token) {
  const login = await axios.post("http://localhost:8090/api/v1/auth/login", {
    email: "rider@juraboy.com.br",
    password: "admin"
  })
  console.log("Successifully logged")
  console.log("Registering with token:", token.substring(0, 10) + "...");
  const body = { userId: '76ac91e7-ea69-4d5a-8a0d-2acd3c535d38', token }
  const headers = { Authorization: "Bearer " + login.data.jwtToken }
  const response = await axios.post("http://localhost:8090/api/v1/notifications/subscribe", body, { headers })
  console.log(response.data)
}

async function testNotfication(token) {
  const login = await axios.post("http://localhost:8090/api/v1/auth/login", {
    email: "rider@juraboy.com.br",
    password: "admin"
  })
  console.log("Successifully logged")
  console.log("Registering with token:", token.substring(0, 10) + "...");
  const body = { token, body: 'My Name Is Slim Shady' }
  const headers = { Authorization: "Bearer " + login.data.jwtToken }
  const response = await axios.post("http://localhost:8090/api/v1/notifications/test", body, { headers })
  console.log("Recv Notify?")
}

export default App;
