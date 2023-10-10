import React, { useContext, useState } from 'react';
import GoogleButton from '@/components/GoogleButton';
import Input from '@/components/Inputs';
import { isValidName, isValidEmail, isValidAreaCode, isValidPhone, isValidPassword } from '../../utils/validations';
import Image from 'next/image';
import { ProductContext } from '@/context/ProductContext';
import Loader from '../../public/icons/loader.gif';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { register } from '../../utils/apiUsers';

const Register = ({ onClick }) => {
    const { isLoading, toggleIsLoading } = useContext(ProductContext);
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
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
        const newFormState = {
            ...form,
            [name]: value
        };
        setForm(newFormState);

        const isFilled =
            newFormState.name.length > 0 &&
            newFormState.email.length > 0 &&
            newFormState.areaCode.length > 0 &&
            newFormState.phoneNumber.length > 0 &&
            newFormState.password.length > 0 &&
            newFormState.confirmPassword.length > 0;

        setIsFormValid(isFilled);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            isValidName(form.name) &&
            isValidEmail(form.email) &&
            isValidAreaCode(form.areaCode) &&
            isValidPhone(form.phoneNumber) &&
            isValidPassword(form.password) &&
            form.confirmPassword === form.password
        ) {
            toggleIsLoading();
            try {
                const res = await register(form);
                if (res.status === 201) {
                    setTimeout(() => {
                        toggleIsLoading();
                        window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                setEmailError(error.message);
                setTimeout(() => setEmailError(""), 4000);
                toggleIsLoading();
            }
        }
    };


    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="w-full lg:max-w-lg">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
                    <h2 className='font-extrabold text-5xl text-center mb-5 pb-5'>REGISTER</h2>
                    <div className="mb-6">
                        <Input
                            type={"text"}
                            placeholder={"Your Name"}
                            labelName={"Name"}
                            name={"name"}
                            onChange={handleInputChange}
                            formValue={form.name}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            type={"email"}
                            placeholder={"Your Email"}
                            labelName={"Email Address"}
                            name={"email"}
                            onChange={handleInputChange}
                            formValue={form.email}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                    <div className="mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type={"text"}
                                placeholder={"Your Area Code"}
                                labelName={"Area Code"}
                                name={"areaCode"}
                                onChange={handleInputChange}
                                formValue={form.areaCode}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Your Phone Number"}
                                labelName={"Phone Number"}
                                name={"phoneNumber"}
                                onChange={handleInputChange}
                                formValue={form.phoneNumber}
                            />
                        </div>
                    </div>
                    <div className="mb-12 flex">
                        <div className="w-1/2 pr-2 relative">
                            <Input
                                type={!showPassword1 ? "password" : "text"}
                                placeholder={"Your Password"}
                                labelName={"Password"}
                                name={"password"}
                                onChange={handleInputChange}
                                formValue={form.password}
                            />
                            <div
                                onClick={() => setShowPassword1(!showPassword1)}
                                className='absolute right-5 top-[37px]'
                            >
                                {!showPassword1 ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                            </div>
                        </div>
                        <div className="w-1/2 pl-2 relative">
                            <Input
                                type={!showPassword2 ? "password" : "text"}
                                placeholder={"Confirm Your Password"}
                                labelName={"Confirm Password"}
                                name={"confirmPassword"}
                                onChange={handleInputChange}
                                passwordValue={form.password}
                            />
                            <div
                                onClick={() => setShowPassword2(!showPassword2)}
                                className='absolute right-3 top-[37px]'
                            >
                                {!showPassword2 ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between mt-6">
                        <button
                            className={`${!isFormValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ' hover:bg-gray-800 bg-black'} font-bold py-2 px-4 text-white rounded w-full`}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            {isLoading ? (
                                <div className='flex items-center justify-center'>
                                    <Image src={Loader} height={25} width={25} alt='Loading' />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <span>Register</span>
                            )}
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