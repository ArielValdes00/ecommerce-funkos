import React from 'react';
import NavBar from '@/components/Navbar';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from '@/components/miscellaneous/ContactForm';

const contact = () => {
    const { data: session } = useSession();
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
                    <ContactForm toast={toast}/>
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