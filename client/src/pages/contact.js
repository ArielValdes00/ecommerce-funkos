import React from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from '@/components/miscellaneous/ContactForm';

const contact = () => {
    return (
        <section className='py-5 bg-gray-100 2xl:h-screen 2xl:mb-[-150px]' style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>
            <div className="mb-7 md:px-28 mx-4">
                <div className="text-xs text-gray-500 mb-7">
                    <Link href={"/"}>Funko</Link> / <span>Contact</span>
                </div>
                <h1 className="text-5xl font-extrabold mb-7 py-4">CONTACT</h1>
            </div>
            <div className="flex items-center justify-center mx-4 ">
                <ContactForm toast={toast} />
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
            />
        </section>
    )
}

export default contact