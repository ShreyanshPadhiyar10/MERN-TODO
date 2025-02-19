import { NavLink, useNavigate } from "react-router-dom"
import TextInput from "../FormInputs/TextInput"
import PasswordInput from "../FormInputs/PasswordInput"
import { useState } from "react";
import { axiosInstance } from "../../axios/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  // const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const response = await axiosInstance.post('/api/v1/users/login',
      { username, password },
    ).catch((err) => {
      setErrorText(err.response.data.message)
    })

    if (response) {
      navigate("/add-todo")
      setUsername("")
      setPassword("")
      setErrorText("")
    }
  }

  return (
    <>
      <div className="h-screen flex items-center">
        <div className="lg:p-14 md:p-10 sm:20 p-8 w-full sm:w-1/2 md:w-1/3 mx-8 sm:mx-auto border border-black backdrop-blur-md">
          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900">
            Login
          </h1>
          <p className="text-center text-red-500">{errorText}</p>
          <form action="#" method="POST">
            <div className="mb-4">
              <label className="block text-gray-900">Username</label>
              <TextInput value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900">Password</label>
              <PasswordInput value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password" />
            </div>
            <button type="submit" onClick={handleLogin} className="border-2 border-black bg-black text-white hover:border-black font-semibold rounded-md py-2 px-4 w-full mt-3">Login</button>
          </form>

          <div className="mt-6 text-center">
            New here? <NavLink to={"/signup"} className="hover:underline hover:text-gray-900 text-gray-900">Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
