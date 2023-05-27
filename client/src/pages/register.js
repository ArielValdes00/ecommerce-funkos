import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import GoogleButton from '@/components/GoogleButton';
import Input from '@/components/Inputs';
import Link from 'next/link';
import axios from 'axios';

const register = () => {
    const { data: session, status } = useSession()
    const [form, setForm] = useState({
        name: "",
        email: "",
        areaCode: "",
        phoneNumber: "",
        password: ""
    })

    const router = useRouter()
    if (status !== 'loading' && status === "authenticated") {
        router.push("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/register", form)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full sm:max-w-md lg:max-w-lg">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pb-5 pt-3">
                    <h2 className='font-extrabold text-4xl text-center mb-5 pb-5'>FUNKO</h2>
                    <div className="mb-4">
                        <Input
                            type={"text"}
                            placeholder={"Name"}
                            labelName={"Name"}
                            name={"name"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type={"email"}
                            placeholder={"Email Address"}
                            labelName={"Email Address"}
                            name={"email"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type={"text"}
                                placeholder={"Area Code"}
                                labelName={"Area Code"}
                                name={"areaCode"}
                                onChange={handleChange}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Phone Number"}
                                labelName={"Phone Number"}
                                name={"phoneNumber"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex">
                        <div className="w-1/2 pr-2">
                            <Input
                                type={"password"}
                                placeholder={"Password"}
                                labelName={"Password"}
                                name={"password"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <Input
                                type={"password"}
                                placeholder={"Confirm Password"}
                                labelName={"Confirm Password"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between mt-6">
                        <button
                            className="bg-black hover:bg-gray-800 w-full text-white font-bold py-2 px-4 rounded "
                            type="submit"
                        >
                            Register
                        </button>
                        <div className="flex items-center my-3">
                            <div className="px-4 border border-gray-300"></div>
                            <div className="mx-2 text-gray-500 uppercase">or</div>
                            <div className="px-4 border border-gray-300"></div>
                        </div>
                        <GoogleButton />
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href={"/login"} className="text-black hover:text-gray-800 font-bold">
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default register;
