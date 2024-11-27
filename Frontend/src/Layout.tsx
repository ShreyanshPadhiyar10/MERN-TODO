import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'


function Layout() {
    return (
        <>
            <div className='h-screen w-screen bg-cover bg-center' style={{ backgroundImage: "url('/sunset.jpeg')" }}>
                <Header />
                {/* <Home /> */}
                <Outlet />
            </div>
        </>
    )
}

export default Layout
