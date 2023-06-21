import React, { useState } from 'react';
import { useRouter } from 'next/router';
import GoogleButton from '@/components/GoogleButton';
import Input from '@/components/Inputs';
import axios from 'axios';

const Register = ({ onClick }) => {
    const router = useRouter()
    const [form, setForm] = useState({
        name: "",
        email: "",
        areaCode: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/users", form)
            if (res.status === 201) {
                router.push("/login")
            }
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="w-full  lg:max-w-lg">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
                    <h2 className='font-extrabold text-5xl text-center mb-5 pb-5'>REGISTER</h2>
                    <div className="mb-6">
                        <Input
                            type={"text"}
                            placeholder={"Name"}
                            labelName={"Name"}
                            name={"name"}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            type={"email"}
                            placeholder={"Email Address"}
                            labelName={"Email Address"}
                            name={"email"}
                        />
                    </div>
                    <div className="mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type={"text"}
                                placeholder={"Area Code"}
                                labelName={"Area Code"}
                                name={"areaCode"}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Phone Number"}
                                labelName={"Phone Number"}
                                name={"phone"}
                            />
                        </div>
                    </div>
                    <div className="mb-12 flex">
                        <div className="w-1/2 pr-2">
                            <Input
                                type={"password"}
                                placeholder={"Password"}
                                labelName={"Password"}
                                name={"password"}
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <Input
                                type={"password"}
                                placeholder={"Confirm Password"}
                                labelName={"Confirm Password"}
                                name={"confirmPassword"}
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
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 flex justify-center gap-1">
                            Already have an account?
                            <span onClick={onClick} className="text-black hover:text-gray-800 font-bold cursor-pointer underline">
                                Log in
                            </span>
                        </p>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Register