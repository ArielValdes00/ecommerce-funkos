import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';

const ContactForm = ({ toast, title }) => {
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true)
        emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, formRef.current, process.env.NEXT_PUBLIC_PUBLIC_KEY)
            .then(() => {
                formRef.current.reset();
                setIsLoading(false)
                toast.success("Message sent successfully");
            }, (error) => {
                console.log(error);
            });
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
                </div>
                <button
                    className="bg-black hover:bg-gray-800 w-full text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        <span>Submit</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default ContactForm