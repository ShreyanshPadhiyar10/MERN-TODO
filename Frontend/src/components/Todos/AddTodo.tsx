import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../FormInputs/TextInput";
import { axiosInstance } from "../../axios/axios";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate()

  const handleAddTodo = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    console.log(status);
    const response = await axiosInstance.post("/api/v1/todo/createTodo", { title, description, status }).catch((err) => {
      setErrorText(err.response.data.message)
    })
    if (response) {
      setTitle("")
      setDescription("")
      navigate("/todo")
    }
  }
  return (
    <>
      <div className="h-screen flex items-center">
        <div className="lg:p-14 md:p-10 sm:20 p-8 w-full sm:w-1/2 md:w-1/3 mx-8 sm:mx-auto border border-black backdrop-blur-md">
          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900">
            Add Todo
          </h1>
          <p className="text-center text-red-500">{errorText}</p>
          <form action="#" method="POST">
            <div className="mb-4">
              <label className="block text-gray-900">Title</label>
              <TextInput value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900">Description</label>
              <TextInput value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900">Status</label>
              <select onChange={(e) => setStatus(e.target.value)} value={status} className="block w-full px-4 py-2 text-white bg-transparent border-2 border-black rounded-sm shadow-sm focus:outline-none transition-colors">
                <option className="text-black" value="pending">pending</option>
                <option className="text-black" value="inProgress">inProgress</option>
                <option className="text-black" value="completed">completed</option>
              </select>
            </div>
            <button type="submit" onClick={handleAddTodo} className="border-2 border-black bg-black text-white hover:border-black font-semibold rounded-md py-2 px-4 w-full mt-3">Add</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTodo
