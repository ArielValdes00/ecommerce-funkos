import React, { useState } from 'react';
import PayPalCheckoutButton from './PayPalCheckoutButton';
import { getSession, useSession } from 'next-auth/react';
import { updateUser } from '../../utils/apiUsers';
import { AiFillCloseCircle } from 'react-icons/ai';

const ModalPayPal = ({
    cart,
    userId,
    estimatedTotal,
    shippingCost,
    toggleCheckoutProcess,
    removeAllItemsFromCart,
    toast
}) => {
    const { data: session } = useSession();
    const user = session.user;
    const [updatedUser, setUpdatedUser] = useState(user);
    const [showForm, setShowForm] = useState(
        !user.address || !user.postalCode || !user.identificationNumber || !user.recipientName
    );

    const handleInputChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        await updateUser(user.id, updatedUser);
        const updatedSession = await getSession();
        setUpdatedUser(updatedSession.user);
        setShowForm(false);
    };

    return (
        <div className="fixed z-40 inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={toggleCheckoutProcess}></div>
            <div className="bg-white relative z-50 px-4 md:px-7 py-6 mx-auto rounded-lg shadow-lg flex flex-col gap-4 w-[390px] md:w-[450px] text-center">
                <AiFillCloseCircle
                    onClick={toggleCheckoutProcess}
                    size={25}
                    className='cursor-pointer absolute right-2 top-2'
                />
                <h4 className="text-3xl font-semibold mt-3">
                    {showForm ? 'Complete Your Information' : 'Complete Your Payment'}
                </h4>
                <p className="max-w-sm text-sm text-gray-500">
                    {showForm
                        ? 'Please fill in the following details to proceed with your purchase.'
                        : 'Please select a payment method to complete your purchase.'}
                </p>
                {showForm ? (
                    <div>
                        <div className="mt-2 flex justify-center">
                            <form onSubmit={handleSaveClick} className='flex flex-col md:w-5/6 gap-2 text-[16px]'>
                                <div className='flex justify-between items-center'>
                                    <label htmlFor="address">Address: </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={!updatedUser.address ? '' : updatedUser.address}
                                        onChange={handleInputChange}
                                        className='border py-1 ps-2 rounded-md border-black'
                                        placeholder='Your Address'
                                    />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label htmlFor="postalCode">Postal Code: </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        id="postalCode"
                                        value={!updatedUser.postalCode ? '' : updatedUser.postalCode}
                                        onChange={handleInputChange}
                                        className='border py-1 ps-2 rounded-md border-black'
                                        placeholder='Your Postal Code'
                                    />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label htmlFor="id">ID: </label>
                                    <input
                                        type="text"
                                        name="identificationNumber"
                                        id="id"
                                        value={!updatedUser.identificationNumber ? '' : updatedUser.identificationNumber}
                                        onChange={handleInputChange}
                                        className='border py-1 ps-2 rounded-md border-black'
                                        placeholder='Your ID'
                                    />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label htmlFor="recieve">Recieve: </label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        id="recieve"
                                        value={!updatedUser.recipientName ? '' : updatedUser.recipientName}
                                        onChange={handleInputChange}
                                        className='border py-1 ps-2 rounded-md border-black'
                                        placeholder='Your Name Recieve'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='flex justify-center items-center gap-3 text-lg border-2 uppercase rounded-full px-3 py-2 mt-3 w-full font-extrabold border-black hover:bg-white hover:text-black bg-black text-white'>
                                    send
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div>
                        <PayPalCheckoutButton
                            cart={cart}
                            userId={userId}
                            estimatedTotal={estimatedTotal}
                            shippingCost={shippingCost}
                            setCheckoutProcess={toggleCheckoutProcess}
                            removeAllItemsFromCart={removeAllItemsFromCart}
                            toast={toast}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalPayPal;
