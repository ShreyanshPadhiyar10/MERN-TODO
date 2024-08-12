import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

interface Props { }

function Layout(props: Props) {
    const { } = props

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout
