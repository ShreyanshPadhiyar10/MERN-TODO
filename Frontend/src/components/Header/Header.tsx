import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineLightMode } from 'react-icons/md'
import { NavLink } from 'react-router-dom'


interface Props { }

function Header(props: Props) {
    const { } = props
    const [nav, setNav] = useState(false);

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    // Array containing navigation items
    const navItems = [
        { id: 1, text: 'Home' },
        { id: 2, text: 'Company' },
        { id: 3, text: 'Resources' },
        { id: 4, text: 'About' },
        { id: 5, text: 'Contact' },
    ];

    return (
        <>
            <header className='w-screen absolute flex justify-between items-center px-6 py-5'>
                <div className="lg:flex lg:gap-x-12 ml-3">
                    <a href="#" className="text-lg font-semibold leading-6 text-gray-900">
                        Welcome, User
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav aria-label="Global" className="hidden md:flex max-w-7xl items-center justify-between  lg:px-8">
                    <div className="md:flex md:flex-1 lg:justify-end gap-x-5">
                        <div>
                            <NavLink to={"/login"}>
                                <button className="bg-transparent border-2 border-black text-black font-bold py-2 px-4 rounded hover:border-black hover:backdrop-blur-3xl">
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </button>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to={"/add-todo"}>
                                <button className='flex bg-transparent border-2 border-black text-black font-bold py-2 px-4 rounded hover:border-black hover:backdrop-blur-3xl'>
                                    <h4>Add Task</h4>
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
                            ? 'text-black fixed md:hidden right-0 top-0 w-[50%] h-full backdrop-blur-lg ease-in-out'
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
                                        <h4>Add Task</h4>
                                    </button>
                                </NavLink>
                            </li>
                            <li className='hover:border border-black mx-3 mb-3 rounded-lg'>
                                <NavLink to={"/login"}>
                                    <button className="bg-transparent text-black font-bold py-2 px-4">
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header
