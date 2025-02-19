import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineLightMode } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { getCurrentLoginUser, logoutAction } from '../../redux/user/userSlice'
import { useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { axiosInstance } from '../../axios/axios'


function Header() {
    const [nav, setNav] = useState(false);
    const [user, setUser] = useState("")
    const cookie = document.cookie
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        if (cookie) {
            console.log(cookie);
            dispatch(getCurrentLoginUser())
            console.log("called");
        }
    }, [cookie, dispatch])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = useSelector((state: any) => state?.user?.user?.data)

    useEffect(() => {
        if (data) {
            console.log("helloo");
            setUser(data.username)
        }
    }, [cookie, data])

    const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const response = await axiosInstance.post("/api/v1/users/logout")
        console.log(response);
        dispatch(logoutAction())
        if (response) {
            navigate("/login")
        }
    }

    return (
        <>
            <header className='w-screen absolute flex justify-between items-center px-6 py-5'>
                {
                    data ?
                        <div className="lg:flex lg:gap-x-12 ml-3">
                            <a href="#" className="text-lg font-semibold leading-6 text-gray-900">
                                Welcome, {user}
                            </a>
                        </div>
                        :
                        <div></div>
                }

                {/* Desktop Navigation */}
                <nav aria-label="Global" className="hidden md:flex max-w-7xl items-center justify-between  lg:px-8">
                    <div className="md:flex md:flex-1 lg:justify-end gap-x-5">
                        {data ?
                            <div>
                                <button onClick={handleLogout} className="bg-transparent border-2 border-black text-black font-bold py-2 px-4 rounded hover:border-black hover:backdrop-blur-3xl">
                                    Logout <span aria-hidden="true"></span>
                                </button>
                            </div>
                            :
                            <div>
                                <NavLink to={"/login"}>
                                    <button className="bg-transparent border-2 border-black text-black font-bold py-2 px-4 rounded hover:border-black hover:backdrop-blur-3xl">
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </button>
                                </NavLink>
                            </div>
                        }
                        <div>
                            <NavLink to={"/add-todo"}>
                                <button className='flex bg-transparent border-2 border-black text-black font-bold py-2 px-4 rounded hover:border-black hover:backdrop-blur-3xl'>
                                    <h4>Add Todo</h4>
                                    <IoIosAdd size={'1.4em'} className='ml-2 bg-gray-900 text-white rounded-full' />
                                </button>
                            </NavLink>
                        </div>
                        <div id='themeBtn' className='w-auto p-[8px] self-center bg-gray-900 rounded-full text-white font-bold'>
                            <MdOutlineLightMode size={'1.6em'} />
                        </div>
                    </div>
                </nav>

                <div onClick={handleNav} className='block md:hidden text-gray-900'>
                    <AiOutlineMenu size={25} />
                </div>

                {/* Mobile Navigation Menu */}
                <div
                    className={
                        nav
                            ? 'text-black fixed md:hidden z-50 right-0 top-0 w-[50%] h-full backdrop-blur-lg ease-in-out'
                            : 'ease-in-out w-[50%] text-black fixed top-0 bottom-0 left-[-100%]'
                    }
                >
                    {/* Mobile Navigation Icon */}
                    <div className='flex justify-between mx-6 my-5'>
                        <div id='themeBtn' className='w-auto p-[5px] self-center bg-gray-900 rounded-full text-white font-bold'>
                            <MdOutlineLightMode size={'1.3em'} />
                        </div>
                        <div onClick={handleNav} className='flex justify-end md:hidden items-center'>
                            <AiOutlineClose size={22} className='text-center' />
                        </div>
                    </div>

                    {/* Mobile Navigation Items */}
                    <div className=''>
                        <ul>
                            <li className='hover:border border-black mx-3 mb-2 rounded-lg'>
                                <NavLink to={"/add-todo"}>
                                    <button className='flex bg-transparent text-black font-bold py-2 px-4'>
                                        <h4>Add Todo</h4>
                                    </button>
                                </NavLink>
                            </li>
                            {
                                !data ?
                                    <li className='hover:border border-black mx-3 mb-3 rounded-lg'>
                                        <NavLink to={"/login"}>
                                            <button className="bg-transparent text-black font-bold py-2 px-4">
                                                Log in <span aria-hidden="true">&rarr;</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    :
                                    <li className='hover:border border-black mx-3 mb-3 rounded-lg'>
                                        <button onClick={handleLogout} className="bg-transparent text-black font-bold py-2 px-4">
                                            Logout <span aria-hidden="true">&rarr;</span>
                                        </button>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header
