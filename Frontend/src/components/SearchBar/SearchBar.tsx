import React from 'react'
function SearchBar() {

    return (
        <>
            <input type="text" className="h-12 w-72 sm:w-96 pr-8 pl-5 rounded bg-transparent border-2 border-black text-black placeholder:text-black z-0 focus:shadow focus:outline-none" placeholder="Search todos..." />
        </>
    )
}

export default SearchBar
