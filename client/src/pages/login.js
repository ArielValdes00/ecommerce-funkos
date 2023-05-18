import React from 'react'
import { signIn, useSession } from 'next-auth/react';

const login = () => {
    const { data: session, status } = useSession();
    console.log(session)
   

    return (
        <div className='h-screen grid items-center justify-center'>
            <button onClick={() => signIn()}>Sign in with Google</button>
        </div>
    )
}

export default login