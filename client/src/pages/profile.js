import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { updateUser } from '../../utils/apiUsers';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';

const profile = ({ session }) => {
    const { data: status } = useSession();
    const router = useRouter();
    const user = session.user
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleInputChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = async () => {
        await updateUser(user.id, updatedUser);
        const updatedSession = await getSession();
        setUpdatedUser(updatedSession.user);
        setEditing(false);
    };

    return (
        <div>
            <Navbar session={session} />
            <section className="py-5 md:px-28 mx-4">
                <div className="mb-7">
                    <div className="text-xs text-gray-500 mb-7">
                        <Link href={"/"}>Funko</Link> / <span>My Account</span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-7 py-4">MY ACCOUNT</h1>
                </div>
                <p>
                    <strong>Name:</strong>{' '}
                    {editing ? (
                        <input
                            type="text"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{updatedUser.name}</span>
                    )}
                </p>
                <p>
                    <strong>Email:</strong>{' '}
                    {editing ? (
                        <input
                            type="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{updatedUser.email}</span>
                    )}
                </p>
                <p>
                    <strong>Phone Number:</strong>{' '}
                    {editing ? (
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedUser.phoneNumber}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{updatedUser.phoneNumber}</span>
                    )}
                </p>
                <p>
                    <strong>Area Code:</strong>{' '}
                    {editing ? (
                        <input
                            type="text"
                            name="areaCode"
                            value={updatedUser.areaCode}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{updatedUser.areaCode}</span>
                    )}
                </p>
                {!editing && (
                    <button onClick={handleEditClick}>
                        Edit
                    </button>
                )}
                {editing && (
                    <button onClick={handleSaveClick}>
                        Save
                    </button>
                )}
            </section>
            <BannerSocialMedia />
            <Footer />
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    return {
        props: {
            session
        }
    }
}

export default profile
