import React from 'react'
import Image from 'next/image'
import Google from '../../public/icons/google.png'
import { signIn } from 'next-auth/react';


const GoogleButton = () => {
    return (
        <button
            onClick={() => signIn('google')}
            className="flex gap-3 items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
        >
            <Image src={Google} height={20} width={20} alt='Google'></Image>
            Sign in with Google
        </button>
    )
}

export default GoogleButton