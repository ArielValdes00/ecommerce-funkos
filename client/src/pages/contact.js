import React, { useState, useRef } from 'react';
import NavBar from '@/components/Navbar';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify'
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';

const contact = () => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        user_email: "",
        user_name: "",
        message: ""
    })
    const formRef = useRef(null);

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <NavBar session={session} />
            <section className='py-5 bg-gray-100'>
                <div className="mb-7 md:px-28 mx-4">
                    <div className="text-xs text-gray-500 mb-7">
                        <Link href={"/"}>Funko</Link> / <span>Contact</span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-7 py-4">CONTACT</h1>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <form onSubmit={handleSubmit} ref={formRef} className="bg-white flex flex-col justify-center shadow-md rounded max-h-2xl mb-4 p-6">
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    name="user_email"
                                    id="user_email"
                                    onChange={handleChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_name">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    onChange={handleChange}
                                    name="user_name"
                                    id="user_name"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Your Message"
                                    onChange={handleChange}
                                    name="message"
                                    id="message"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                </div>
            </section>
            <BannerSocialMedia />
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
            />
        </>
    )
}

export default contact