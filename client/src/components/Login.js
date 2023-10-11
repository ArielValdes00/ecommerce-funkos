import React, { useState } from 'react';
import GoogleButton from '@/components/GoogleButton';
import { signIn } from 'next-auth/react';
import { isValidEmail, isValidPassword } from '../../utils/validations';
import Loader from '../../public/icons/loader.gif';
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useBooleanState from '@/hooks/useBooleanState';

const Login = ({ onClick, toggleShowForgotPassword }) => {
    const [emailError, setEmailError] = useState("");
    const [showPassword, toggleShowPassword] = useBooleanState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, toggleIsLoading] = useBooleanState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidEmail(form.email)) {
            setEmailError("Invalid Format")
            setTimeout(() => setEmailError(""), 4000);
            return;
        } else if (!isValidPassword(form.password)) {
            setPasswordError("The password must be between 8 and 16 characters.")
            setTimeout(() => setPasswordError(""), 4000);
            return;
        }
        try {
            toggleIsLoading();
            const res = await signIn('credentials', {
                email: form.email,
                password: form.password,
                callbackUrl: "/",
                redirect: false
            });
            if (res.status === 200) {
                window.location.href = res.url;
            }
            setEmailError("");
            setPasswordError("");
            if (res.error === "User not found") {
                setEmailError("Invalid email. Please check your email address.");
                setTimeout(() => setEmailError(""), 4000);
                toggleIsLoading();
            } else if (res.error === "Invalid password") {
                setPasswordError("Invalid password. Please check your password.");
                setTimeout(() => setPasswordError(""), 4000);
                toggleIsLoading();
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        const newFormState = { ...form, [e.target.name]: e.target.value };
        setForm(newFormState);
    
        const isFilled =
            newFormState.email.length > 0 &&
            newFormState.password.length > 0;
    
        setIsFormValid(isFilled);
    };
    

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
                <form onSubmit={handleSubmit} className="bg-white flex flex-col justify-center shadow-md rounded max-h-2xl p-6">
                    <h2 className='font-extrabold text-5xl text-center mb-5 pb-5'>LOG IN</h2>
                    <div className="mb-6 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={'Email Address'}>
                            Email Address
                        </label>
                        <input
                            type={"email"}
                            placeholder={"Your Email"}
                            onChange={handleChange}
                            name={"email"}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={'Password'}>
                            Password
                        </label>
                        <input
                            type={!showPassword ? "password" : "text"}
                            placeholder={"Your Password"}
                            onChange={handleChange}
                            name={"password"}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        <div
                            onClick={() => toggleShowPassword()}
                            className='absolute right-5 top-[37px]'
                        >
                            {!showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        <div className='text-end mt-2 me-2 cursor-pointer' onClick={toggleShowForgotPassword}>
                            <span className='text-[14px] underline font-bold'>Forgot Password?</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between">
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
                                <span>Login</span>
                            )}
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