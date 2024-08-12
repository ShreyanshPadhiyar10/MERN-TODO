import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const test = async() => {
    const response = await axios.post("/api/v1/users/login")
    console.log(response);
  }

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
