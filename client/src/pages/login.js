import React from 'react';
import Login from '@/components/Login';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import Register from '@/components/Register';
import useBooleanState from '@/hooks/useBooleanState';
import ForgotPassword from '@/components/ForgotPassword';

const login = () => {
    const [isLogin, toggleIsLogin] = useBooleanState(true);
    const [showForgotPassword, toggleShowForgotPassword] = useBooleanState(false);

    return (
        <div>
            <section className='bg-gray-100 md:px-28 py-5'>
                <div className='mx-4'>
                    <div className="text-xs text-gray-500 mb-5">
                        <Link href={"/"}>Funko</Link> / <span>Log In</span>
                    </div>
                </div>
                <div className='py-5 mx-4'>
                    {showForgotPassword ? (
                        <ForgotPassword toggleShowForgotPassword={toggleShowForgotPassword} />
                    ) : (
                        isLogin ? (
                            <Login onClick={toggleIsLogin} toggleShowForgotPassword={toggleShowForgotPassword}/>
                        ) : (
                            <Register onClick={toggleIsLogin} />
                        )
                    )}

                </div>
            </section>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    return { props: {} };
}

export default login