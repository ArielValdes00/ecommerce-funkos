import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import useBooleanState from '@/hooks/useBooleanState';
import { isValidName, isValidTextArea, isValidEmail } from '../../../utils/validations';
import Image from 'next/image';
import Loader from '/public/icons/loader.gif';

const ContactForm = ({ toast, title }) => {
    const [isLoading, toggleIsLoading] = useBooleanState(false);
    const [emailError, setEmailError] = useState("");
    const [userError, setUserError] = useState("");
    const [textAreaError, setTextAreaError] = useState("");
    const [form, setForm] = useState({
        user_email: "",
        user_name: "",
        message: ""
    })
    const formRef = useRef(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidEmail(form.user_email)) {
            setEmailError("Invalid Format");
            setTimeout(() => setEmailError(""), 4000);
            return;
        } else if (!isValidName(form.user_name)) {
            setUserError("Invalid Format");
            setTimeout(() => setUserError(""), 4000);
            return;
        } else if (!isValidTextArea(form.message)) {
            setTextAreaError("Invalid Format");
            setTimeout(() => setTextAreaError(""), 4000);
            return;
        }
        try {
            toggleIsLoading();
            emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, formRef.current, process.env.NEXT_PUBLIC_PUBLIC_KEY)
                .then(() => {
                    formRef.current.reset();
                    toggleIsLoading();
                    toast.success("Message sent successfully!");
                }, (error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} ref={formRef} className="bg-white flex flex-col justify-center shadow-md rounded max-h-2xl mb-4 p-6">
                {title}
                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2" htmlFor="user_email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        name="user_email"
                        id="user_email"
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2" htmlFor="user_name">
                        Subject
                    </label>
                    <input
                        type="text"
                        placeholder="Subject"
                        onChange={handleChange}
                        name="user_name"
                        id="user_name"
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {userError && <p className="text-red-500 text-sm mt-1">{userError}</p>}
                </div>
                <div className="mb-4 w-full">
                    <label className="block text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Your Message"
                        onChange={handleChange}
                        name="message"
                        id="message"
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {textAreaError && <p className="text-red-500 text-sm mt-1">{textAreaError}</p>}
                </div>
                <button
                    className="bg-black hover:bg-gray-800 w-full text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    {isLoading ? (
                        <div className='flex items-center justify-center'>
                            <Image src={Loader} height={25} width={25} alt='Loading' />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <span>Submit</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default ContactForm