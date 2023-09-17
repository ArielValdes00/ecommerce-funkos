import React from 'react'

const NavBar = ({ session }) => {
    return (
        <div className='flex justify-between p-4'>
            <h2>Dashboard</h2>
            <h2>Welcome Back, <span className='capitalize'>{session.user.name}</span></h2>
        </div>
    )
}

export default NavBar