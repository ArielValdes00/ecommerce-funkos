import React, { useState } from 'react'
import Input from '@/components/Inputs'
import GoogleButton from '@/components/GoogleButton'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

const Login = ({ onClick }) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    if (status !== 'loading' && status === "authenticated") {
        router.push("/")
    }
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email: form.email,
                password: form.password,
                callbackUrl: "/",
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
                <form onSubmit={handleSubmit} className="bg-white flex flex-col justify-center shadow-md rounded px-8 max-h-2xl py-6">
                    <h2 className='font-extrabold text-5xl text-center mb-5 pb-5'>LOG IN</h2>
                    <div className="mb-4">
                        <Input
                            type={"email"}
                            placeholder={"Email Address"}
                            labelName={"Email Address"}
                            onChange={handleChange}
                            name={"email"}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type={"password"}
                            placeholder={"Password"}
                            labelName={"Password"}
                            onChange={handleChange}
                            name={"password"}
                        />
                        <div className='text-end mt-2 me-2'> 
                            <a className="font-bold text-sm text-black hover:text-gray-800 underline" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <button
                            className="bg-black hover:bg-gray-800 w-full text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            LOG IN
                        </button>
                        <div className="flex items-center my-3">
                            <div className="px-4 border border-gray-300"></div>
                            <div className="mx-2 text-gray-500 uppercase">or</div>
                            <div className="px-4 border border-gray-300"></div>
                        </div>
                        <GoogleButton />
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 flex justify-center gap-1 mt-3">
                            New to Funko?
                            <span onClick={onClick} className="text-black hover:text-gray-800 font-bold cursor-pointer underline">
                                Register Now
                            </span>
                        </p>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Login