import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { updateUser } from '../../utils/apiUsers';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import Map from '/public/icons/map.png';
import Pencil from '/public/icons/pencil.png';
import Shopping from '/public/icons/shopping.png';
import Info from '/public/icons/info.png';
import Confirm from '/public/icons/confirm.png';
import Logout from '/public/icons/logout.png';
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
    const [editingAddress, setEditingAddress] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleInputChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };
    const handleEditAddress = () => {
        setEditingAddress(true);
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = async () => {
        await updateUser(user.id, updatedUser);
        const updatedSession = await getSession();
        setUpdatedUser(updatedSession.user);
        setEditing(false);
        setEditingAddress(false);
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
                <div className='grid xl:grid-cols-3 gap-4'>
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
                                <Image src={Info} height={30} width={30} alt='Info' />
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
                                        className={'w-full'}
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
                                        className={'w-full'}
                                    />
                                ) : (
                                    <span>{updatedUser.email}</span>
                                )}
                            </div>
                            <div>
                                <strong>Area Code: </strong>
                                {editing ? (
                                    <input
                                        type="text"
                                        name="areaCode"
                                        value={updatedUser.areaCode}
                                        onChange={handleInputChange}
                                        className={'w-full'}
                                    />
                                ) : (
                                    <span>{updatedUser.areaCode}</span>
                                )}
                            </div>
                            <div>
                                <strong>Phone Number: </strong>
                                {editing ? (
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={updatedUser.phoneNumber}
                                        onChange={handleInputChange}
                                        className={'w-full'}
                                    />
                                ) : (
                                    <span>{updatedUser.phoneNumber}</span>
                                )}
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button className='w-full flex gap-2 items-center justify-center bg-gray-100 font-semibold rounded-full px-5 py-2 border-2 border-black hover:bg-gray-200'
                                    onClick={!editing ? handleEditClick : handleSaveClick}>
                                    <Image src={!editing ? Pencil : Confirm} height={16} width={16} alt='Pencil' />
                                    {!editing ? 'Add or Change Address' : 'Save'}
                                </button>
                            </div>
                        </div>
                        <div className='bg-white rounded-lg p-4 border w-full mt-4'>
                            <div className='mb-5 flex gap-2'>
                                <Image src={Map} height={30} width={30} alt='Map' />
                                <p className='font-extrabold text-2xl'>My Address</p>
                            </div>
                            <div>
                                <strong>Address: </strong>
                                {editingAddress ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={updatedUser.address}
                                        onChange={handleInputChange}
                                        className='w-full'
                                    />
                                ) : (
                                    <span>{updatedUser.address}</span>
                                )}
                            </div>
                            <div>
                                <strong>Postal Code: </strong>
                                {editingAddress ? (
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={updatedUser.postalCode}
                                        onChange={handleInputChange}
                                        className='w-full'
                                    />
                                ) : (
                                    <span>{updatedUser.postalCode}</span>
                                )}
                            </div>
                            <div>
                                <strong>ID Number: </strong>
                                {editingAddress ? (
                                    <input
                                        type="text"
                                        name="identificationNumber"
                                        value={updatedUser.identificationNumber}
                                        onChange={handleInputChange}
                                        className='w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-1'
                                    />
                                ) : (
                                    <span>{updatedUser.identificationNumber}</span>
                                )}
                            </div>
                            <div>
                                <strong>Receives: </strong>
                                {editingAddress ? (
                                    <input
                                        type="text"
                                        name="recipientName"
                                        value={updatedUser.recipientName}
                                        onChange={handleInputChange}
                                        className='w-full'
                                    />
                                ) : (
                                    <span>{updatedUser.recipientName}</span>
                                )}
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button className='w-full flex gap-2 items-center justify-center bg-gray-100 font-semibold rounded-full px-5 py-2 border-2 border-black hover:bg-gray-200'
                                    onClick={!editingAddress ? handleEditAddress : handleSaveClick}>
                                    <Image src={!editingAddress ? Pencil : Confirm} height={16} width={16} alt='Edit' />
                                    {!editingAddress ? 'Add or Change Address' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='lg:hidden bg-white p-4 rounded-lg border'>
                        <div className='flex items-center justify-center w-1/2 md:w-1/3 mx-auto bg-gray-100 border-2 border-black rounded-full py-2 px-4 gap-2 cursor-pointer hover:bg-gray-200' onClick={signOut}>
                            <Image src={Logout} height={20} width={20} alt='Logout' />
                            <p className='font-semibold'>Logout</p>
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
