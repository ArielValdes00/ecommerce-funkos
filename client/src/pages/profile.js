import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { updateUser } from '../../utils/apiUsers';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import Map from '../../public/icons/map.png';
import Pencil from '../../public/icons/pencil.png';
import Shopping from '../../public/icons/shopping.png';
import Info from '../../public/icons/info.png';
import Image from 'next/image';

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
        <div className='bg-gray-100'>
            <Navbar session={session} />
            <section className="py-5 md:px-28 mx-4">
                <div className="mb-7">
                    <div className="text-xs text-gray-500 mb-7">
                        <Link href={"/"}>Funko</Link> / <span>My Account</span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-7 py-4">MY ACCOUNT</h1>
                </div>
                <div className='grid xl:grid-cols-3 gap-4 mb-7'>
                    <div className='xl:col-span-2 bg-white p-4 rounded-lg border'>
                        <div className='flex items-center gap-2'>
                            <Image src={Shopping} height={30} width={30} alt='Shopping' />
                            <p className='font-extrabold text-2xl'>My Shopping</p>
                        </div>
                        <div className='pb-5 flex items-center justify-center h-full'>
                            <p className='py-14'>Empty</p>
                        </div>
                    </div>
                    <div>
                        <div className='bg-white p-4 rounded-lg border w-full'>
                            <div className='mb-5 flex items-center gap-3'>
                                <Image src={Info} height={30} width={30} alt='Info'/>
                                <p className='font-extrabold text-2xl'>My Information</p>
                            </div>
                            <div>
                                <strong>Name: </strong>
                                {editing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedUser.name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span className=''>{updatedUser.name}</span>
                                )}
                            </div>
                            <div>
                                <strong>Email: </strong>
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
                            </div>
                            <div>
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
                            </div>
                            <div>
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
                            </div>
                            <div className='flex justify-center mt-5'>
                                {!editing && (
                                    <button className='w-full flex gap-2 items-center justify-center bg-gray-100 font-semibold rounded-full px-5 py-2 border-2 border-black' onClick={handleEditClick}>
                                        <Image src={Pencil} height={16} width={16} alt='Pencil' />
                                        Edit
                                    </button>
                                )}
                                {editing && (
                                    <button onClick={handleSaveClick}>Save</button>
                                )}
                            </div>
                        </div>
                        <div className='bg-white rounded-lg p-4 border w-full mt-4'>
                            <div className='mb-5 flex gap-2'>
                                <Image src={Map} height={30} width={30} alt='Map' />
                                <p className='font-extrabold text-2xl'>My Address</p>
                            </div>
                            <div>
                                <strong>Domicilio:</strong>
                            </div>
                            <div>
                                <strong>Codigo Postal:</strong>
                            </div>
                            <div>
                                <strong>DNI:</strong>
                            </div>
                            <div>
                                <strong>Receives:</strong>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button className='w-full flex gap-2 items-center justify-center font-semibold bg-gray-100 rounded-full px-5 py-2 border-2 border-black'>
                                    <Image src={Pencil} height={16} width={16} alt='Edit' />
                                    Add or Change Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
