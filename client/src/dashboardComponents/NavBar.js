import React from 'react'

const NavBar = ({ session, section }) => {
    return (
        <div className='flex items-center justify-between p-2 px-3 bg-black'>
            <p className='font-extrabold uppercase text-lg'>{section}</p>
            <div>
                <p>{session.user.name}</p>
            </div>
        </div>
    )
}

export default NavBar