import React from 'react'
import TodoCard from '../Card/TodoCard'

interface Props { }

function Home(props: Props) {
    const { } = props

    return (
        <>
            <div className='h-screen w-screen bg-cover bg-center' style={{ backgroundImage: "url('/sunset.jpeg')" }}>
                <div className='pt-24'>
                    <TodoCard />
                </div>
            </div>
        </>
    )
}

export default Home
