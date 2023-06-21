import React, { useContext, useState } from 'react';
import GoogleButton from '@/components/GoogleButton';
import Input from '@/components/Inputs';
import axios from 'axios';
import { isValidName, isValidEmail, isValidAreaCode, isValidPhone, isValidPassword } from '../../utils/validations';
import Image from 'next/image';
import { ProductContext } from '@/context/ProductContext';
import Loader from '../../public/icons/loader.gif'
const Register = ({ onClick }) => {
    const { isLoading, setIsLoading } = useContext(ProductContext)
    const [form, setForm] = useState({
        name: "",
        email: "",
        areaCode: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            isValidName(form.name) &&
            isValidEmail(form.email) &&
            isValidAreaCode(form.areaCode) &&
            isValidPhone(form.phoneNumber) &&
            isValidPassword(form.password) &&
            form.password === form.confirmPassword
        ) {
            setIsLoading(true);
            try {
                const res = await axios.post('http://localhost:4000/api/users', form);
                if (res.status === 201) {
                    setTimeout(() => {
                        setIsLoading(false);
                        window.location.reload();
                    }, 2000);
                }
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
    };


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
                            onChange={handleInputChange}
                            formValue={form.name}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            type={"email"}
                            placeholder={"Email Address"}
                            labelName={"Email Address"}
                            name={"email"}
                            onChange={handleInputChange}
                            formValue={form.email}
                        />
                    </div>
                    <div className="mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type={"text"}
                                placeholder={"Area Code"}
                                labelName={"Area Code"}
                                name={"areaCode"}
                                onChange={handleInputChange}
                                formValue={form.areaCode}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Phone Number"}
                                labelName={"Phone Number"}
                                name={"phoneNumber"}
                                onChange={handleInputChange}
                                formValue={form.phoneNumber}
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
                                onChange={handleInputChange}
                                formValue={form.password}
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <Input
                                type={"password"}
                                placeholder={"Confirm Password"}
                                labelName={"Confirm Password"}
                                name={"confirmPassword"}
                                onChange={handleInputChange}
                                passwordValue={form.password}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between mt-6">
                        <button
                            className="bg-black hover:bg-gray-800 w-full text-white font-bold py-2 px-4 rounded "
                            type="submit"
                        >
                            {isLoading ? (
                                <div className='flex items-center justify-center'>
                                    <Image src={Loader} height={25} width={25} alt='Loading'/>
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <span>Register</span>
                            )}                        </button>
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