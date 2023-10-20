import React, { useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { updateUser } from '../../utils/apiUsers';
import { getUserPurchaseHistory } from '../../utils/apiPurchase';
import useBooleanState from '@/hooks/useBooleanState';
import { GiShoppingBag } from 'react-icons/gi';
import ProfileSection from '@/components/ProfileSection';
import { MdLogout } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
    isValidName,
    isValidAddress,
    isValidAreaCode,
    isValidDNI,
    isValidEmail,
    isValidZipCode,
    isValidPhone,
} from '../../utils/validations';


const profile = ({ session, purchaseHistory }) => {
    const [editing, toggleEditing] = useBooleanState(false);
    const [editingAddress, toggleEditingAddress] = useBooleanState(false);
    const [errors, setErrors] = useState({});
    const user = session.user;

    const groupedProducts = {};
    purchaseHistory?.forEach((product) => {
        if (!groupedProducts[product.productId]) {
            groupedProducts[product.productId] = { ...product, totalQuantity: 0 };
        }
        groupedProducts[product.productId].totalQuantity += product.quantity;
    });

    const [updatedUser, setUpdatedUser] = useState(user);

    const handleInputChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSaveClick = async (section) => {
        const updatedErrors = { ...errors };

        if (section === 'userInfo') {
            if (!isValidName(updatedUser.name)) {
                updatedErrors.userInfo = "Invalid name";
            }
            if (!isValidEmail(updatedUser.email)) {
                updatedErrors.userInfo = "Invalid Email";
            }
            if (!isValidAreaCode(updatedUser.areaCode)) {
                updatedErrors.userInfo = "Invalid Area Code";
            }
            if (!isValidPhone(updatedUser.phoneNumber)) {
                updatedErrors.userInfo = "Invalid Phone Number";
            }
        } else if (section === 'address') {
            if (!isValidAddress(updatedUser.address)) {
                updatedErrors.address = "Invalid address";
            }
            if (!isValidZipCode(updatedUser.postalCode)) {
                updatedErrors.address = "Invalid Zip Code";
            }
            if (!isValidDNI(updatedUser.identificationNumber)) {
                updatedErrors.address = "Invalid ID";
            }
        }

        if (Object.keys(updatedErrors).length > 0) {
            setErrors(updatedErrors);
        } else {
            await updateUser(user.id, updatedUser);
            const updatedSession = await getSession();
            setUpdatedUser(updatedSession.user);
            if (section === 'userInfo') {
                toggleEditing();
            } else if (section === 'address') {
                toggleEditingAddress();
            }
        }
    };

    const userInfoData = [
        { label: 'Name', name: 'name', value: updatedUser.name },
        { label: 'Email', name: 'email', value: updatedUser.email },
        { label: 'Area Code', name: 'areaCode', value: updatedUser.areaCode || '' },
        { label: 'Phone Number', name: 'phoneNumber', value: updatedUser.phoneNumber || '' },
    ];

    const addressData = [
        { label: 'Address', name: 'address', value: updatedUser.address || '' },
        { label: 'Postal Code', name: 'postalCode', value: updatedUser.postalCode || '' },
        { label: 'ID Number', name: 'identificationNumber', value: updatedUser.identificationNumber || '' },
        { label: 'Receives', name: 'recipientName', value: updatedUser.recipientName || '' },
    ];

    return (
        <div className='bg-gray-100'>
            <section className='py-5 md:px-28 mx-4'>
                <div className='mb-7'>
                    <div className='text-xs text-gray-500 mb-7'>
                        <Link href={'/'}>Funko</Link> / <span>My Account</span>
                    </div>
                    <h1 className='text-5xl font-extrabold mb-7 py-4'>MY ACCOUNT</h1>
                </div>
                <div className='grid xl:grid-cols-3 gap-4'>
                    <div className='xl:col-span-2 bg-white p-4 rounded-lg border'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-2'>
                                <GiShoppingBag size={30} />
                                <p className='font-extrabold text-2xl'>My Shopping</p>
                            </div>
                            {purchaseHistory > 0 && (
                                <p className='font-bold'>
                                    Total Spent: $
                                    {purchaseHistory?.reduce(
                                        (total, product) => total + product.productPrice * product.quantity,
                                        0
                                    ).toFixed(2)}
                                </p>
                            )}
                        </div>
                        <div className='pb-8 flex justify-center'>
                            {purchaseHistory > 0 ? (
                                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 pb-4 uppercase font-semibold text-center'>
                                    {Object.values(groupedProducts).map((product) => (
                                        <Link
                                            href={`/products/${product.productName}`}
                                            key={product.productId}
                                            className='flex flex-col rounded-lg border shadow-md p-3 hover:scale-[1.02] transition-transform duration-200'
                                        >
                                            <img src={product.productImage} height={170} width={170} alt={product.productName} />
                                            <p className='font-normal'>{product.productCategory}</p>
                                            <p className='font-extrabold'>{product.productName}</p>
                                            <p>${product.productPrice}</p>
                                            <p className='text-sm'>Quantity: {product.totalQuantity}</p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className='pt-6 lg:pt-40'>Empty</p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <ProfileSection
                            icon={AiFillInfoCircle}
                            title='My Information'
                            data={userInfoData}
                            isEditing={editing}
                            handleInputChange={handleInputChange}
                            handleSaveClick={() => handleSaveClick('userInfo')}
                            toggleEditing={toggleEditing}
                            error={errors.userInfo} 
                        />
                        <ProfileSection
                            icon={FaLocationDot}
                            title='My Address'
                            data={addressData}
                            isEditing={editingAddress}
                            handleInputChange={handleInputChange}
                            handleSaveClick={() => handleSaveClick('address')}
                            toggleEditing={toggleEditingAddress}
                            error={errors.address}
                        />
                    </div>
                    <div className='lg:hidden bg-white p-4 rounded-lg border'>
                        <div
                            className='flex items-center justify-center w-1/2 md:w-1/3 mx-auto bg-gray-100 border-2 border-black rounded-full py-2 px-4 gap-2 cursor-pointer hover:bg-gray-200'
                            onClick={signOut}
                        >
                            <MdLogout />
                            <p className='font-semibold'>Logout</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    const userId = session.user.id;
    const purchaseHistory = await getUserPurchaseHistory(userId);

    return {
        props: {
            session,
            purchaseHistory
        }
    };
}

export default profile
