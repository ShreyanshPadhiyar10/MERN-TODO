import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.tsx'
import Home from './components/Home/Home.tsx'
import Login from './components/Auth/Login.tsx'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import TodoPage from './components/TodoPage.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Login />} />
          <Route path='todo' element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
