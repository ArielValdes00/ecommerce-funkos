import React, { useState } from 'react';
import Image from 'next/image';
import useBooleanState from '@/hooks/useBooleanState';
import Loader from '/public/icons/loader.gif';
import { resetPasswordRequest } from '../../utils/apiUsers';
import { isValidEmail } from '../../utils/validations';
import { FaArrowLeft } from 'react-icons/fa';
import { isRedirectError } from 'next/dist/client/components/redirect';

const ForgotPassword = ({ toggleShowForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, toggleIsLoading] = useBooleanState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleIsLoading();
        if (!isValidEmail(email)) {
            setMessage("Invalid Format")
            setTimeout(() => setMessage(""), 4000);
            return;
        } else {
            try {
                const response = await resetPasswordRequest(email);
                setMessage(response?.message);
            } catch (error) {
                setMessage(error.message);
                setTimeout(() => setMessage(""), 4000);
            } finally {
                toggleIsLoading();
            }
        }
    };

    const handleChangeForm = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const isFilled = newEmail.length > 0;
        setIsFormValid(isFilled);
    };


    return (
        <div className="px-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center shadow-xl rounded-md max-w-lg bg-white mx-auto py-5 px-4">
                <div className='self-start cursor-pointer' onClick={() => toggleShowForgotPassword()}>
                    <FaArrowLeft size={22} />
                </div>
                <h2 className='font-extrabold text-3xl sm:text-4xl text-center mb-10'>FORGOT PASSWORD?</h2>
                <div className="w-full">
                    <label className="ms-1 block text-gray-700 text-sm font-bold mb-2" htmlFor='email'>
                        Enter your Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        id='email'
                        value={email}
                        onChange={(e) => handleChangeForm(e)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {message && <p className={`ms-1 mt-1 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
                </div>
                <button
                    type="submit"
                    className={`${!isFormValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ' hover:bg-gray-800 bg-black'} font-bold py-2 px-4 text-white rounded w-full`}
                    disabled={!isFormValid}
                >
                    {isLoading ? (
                        <div className='flex items-center gap-1 justify-center'>
                            <Image src={Loader} height={26} width={26} alt='Loading' loading='eager' />
                            <span>Sending...</span>
                        </div>
                    ) : (
                        <span>Send reset link</span>
                    )}
                </button>
                <p className="text-sm text-gray-600 text-center">
                    Please enter your email address. We will send you a link to reset your password.
                </p>
            </form>
        </div>
    )
}

export default ForgotPassword;
