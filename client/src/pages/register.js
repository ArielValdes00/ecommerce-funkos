import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/router';
const register = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    if (status !== 'loading' && status === "authenticated") {
        router.push("/")
    }
    console.log()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="mb-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaCode">
                                    Area Code
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="areaCode"
                                    type="text"
                                    placeholder="Area Code"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex">
                        <div className="w-1/2 pr-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between mt-6">
                        <button
                            className="bg-black hover:bg-gray-800 w-full text-white font-bold py-2 px-4 rounded "
                            type="button"
                        >
                            Register
                        </button>
                        <div className="flex items-center my-3">
                            <div className="px-4 border border-gray-300"></div>
                            <div className="mx-2 text-gray-500 uppercase">or</div>
                            <div className="px-4 border border-gray-300"></div>
                        </div>
                        <button
                            onClick={() => signIn('google')}
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            type="button"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google">
                                <path
                                    fill="#4285F4"
                                    d="M17.64 9.204c0-.64-.057-1.256-.163-1.848H9v3.49h4.84a4.16 4.16 0 0 1-1.8 2.723v2.266h2.92c1.706-1.57 2.69-3.874 2.69-6.63z"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M9 18c2.437 0 4.47-.81 5.956-2.204l-2.92-2.266c-.8.54-1.826.86-3.036.86-2.34 0-4.32-1.584-5.036-3.716H.957v2.34A8.997 8.997 0 0 0 9 18z"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M3.964 10.204a5.566 5.566 0 0 1-.304-1.704 5.566 5.566 0 0 1 .304-1.704V4.49H.957A8.996 8.996 0 0 0 0 9c0 1.44.343 2.827.957 4.04l3.007-2.34z"
                                ></path>
                                <path
                                    fill="#EA4335"
                                    d="M9 3.96c1.31 0 2.485.45 3.415 1.337l2.559-2.558C13.47.808 11.437 0 9 0A8.996 8.996 0 0 0 .957 4.49L3.964 6.83A5.566 5.566 0 0 1 9 4.49z"
                                ></path>
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a className="text-blue-500 hover:text-blue-800 font-bold" href="#">
                                Log in
                            </a>
                            .
                        </p>
                    </div>
                </form>



            </div>
        </div >
    );
};

export default register;
