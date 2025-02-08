import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.tsx'
import Home from './components/Home/Home.tsx'
import Login from './components/Auth/Login.tsx'
import Signup from './components/Auth/Signup.tsx'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import TodoPage from './components/Todos/TodoPage.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'
import AddTodo from './components/Todos/AddTodo.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='todo' element={<TodoPage />} />
            <Route path='add-todo' element={<AddTodo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
