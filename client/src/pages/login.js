import React, { useState } from 'react';
import Login from '@/components/Login';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import Register from '@/components/Register';

const login = () => {
    const { data: session } = useSession();
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <Navbar session={session} />
            <section className='bg-gray-100 md:px-28 py-5'>
                <div className='mx-4'>
                    <div className="text-xs text-gray-500 mb-5">
                        <Link href={"/"}>Funko</Link> / <span>Log In</span>
                    </div>
                </div>
                <div className='py-5 mx-4'>
                    {isLogin ? (
                        <Login onClick={toggleForm} />
                    ) : (
                        <Register onClick={toggleForm} />
                    )}
                </div>
            </section>
            <BannerSocialMedia />
            <Footer />
        </div>
    )
}

export default login