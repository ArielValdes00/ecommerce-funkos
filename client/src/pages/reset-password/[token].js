import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/legacy/image";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useBooleanState from '@/hooks/useBooleanState';
import Loader from '/public/icons/loader.gif';
import { resetPassword } from '../../../utils/apiUsers';
import { isValidPassword } from '../../../utils/validations';

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword1, toggleShowPassword1] = useBooleanState(false);
    const [showPassword2, toggleShowPassword2] = useBooleanState(false);
    const [isLoading, toggleIsLoading] = useBooleanState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleIsLoading();
        if (password !== confirmPassword || !isValidPassword(password)) {
            setMessage('Passwords do not match or do not meet requirements.');
            setTimeout(() => setMessage(""), 4000);
            toggleIsLoading();
            return;
        }
        try {
            const response = await resetPassword(token, password);
            if (response.success) {
                toggleIsLoading();
                setMessage(response.message);
                setTimeout(() => {
                    setMessage("");
                    router.push("/");
                }, 5000);
            }
        } catch (error) {
            setMessage('An error has occurred. Please try again later.');
            toggleIsLoading();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-xl rounded-md w-[70%] sm:w-[50%] md:w-[40%] lg:w-[33%] bg-white mx-auto py-5 px-4">
                <h2 className='font-extrabold text-3xl sm:text-4xl text-center mb-7'>RESET PASSWORD</h2>
                <div className="w-full relative">
                    <label className="ms-1 block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>
                        New Password
                    </label>
                    <input
                        type={!showPassword1 ? "password" : "text"}
                        id="password"
                        placeholder='Your new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <div
                        onClick={() => toggleShowPassword1()}
                        className='absolute right-5 top-[37px]'
                    >
                        {!showPassword1 ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                    </div>
                </div>
                <div className="w-full relative">
                    <label className="ms-1 block text-gray-700 text-sm font-bold mb-2" htmlFor='confirmPassword'>
                        Confirm Password
                    </label>
                    <input
                        type={!showPassword2 ? "password" : "text"}
                        id="confirm-password"
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <div
                        onClick={() => toggleShowPassword2()}
                        className='absolute right-5 top-[37px]'
                    >
                        {!showPassword2 ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                    </div>
                    {message && <p className={`ms-1 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-black hover:bg-gray-800 w-full text-white font-bold py-2 px-4 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className='flex items-center gap-1 justify-center'>
                            <Image src={Loader} height={26} width={26} alt='Loading' loading='eager' />
                            <span>Updating...</span>
                        </div>
                    ) : (
                        <span>Update Password</span>
                    )}
                </button>
                <p className="text-sm text-gray-600 text-center">
                    Please enter your new password and confirm it below to reset your password.
                </p>
            </form>
        </div>
    );
};

export default ResetPassword;
