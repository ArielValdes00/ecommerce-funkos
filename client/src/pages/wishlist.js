import React, { useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import ModalPurchase from '@/components/miscellaneous/ModalPurchase';
import Login from '@/components/Login';
import Register from '@/components/Register';
import ButtonAdded from '@/components/ButtonProductAdded';
import ContactForm from '@/components/miscellaneous/ContactForm';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useBooleanState from '@/hooks/useBooleanState';
import { useSession } from 'next-auth/react';

const Wishlist = () => {
    const { wishlist,
        toggleWishlist,
        isInWishlist,
        toggleShowModal,
        showModal,
        selectedProductModal,
        setSelectedProductModal,
        isInCart,
        setRemoveModalClicked,
        removeModalClicked
    } = useContext(ProductContext);
    const { data: status } = useSession();

    const [isLogin, toggleIsLogin] = useBooleanState(true);

    const handleOpenModal = (id) => {
        const findProduct = wishlist.find(product => product.id === id);
        setSelectedProductModal(findProduct);
        setRemoveModalClicked(true);
        toggleShowModal();
    }

    const closeModalnWishlist = (selectedProductModal) => {
        toggleWishlist(selectedProductModal.id)
        toggleShowModal();
        setRemoveModalClicked(false);
    }

    return (
        <div>
            {showModal && (
                <ModalPurchase
                    title={
                        removeModalClicked
                            ? 'Are you sure you want to remove the following product from your wishlist?'
                            : 'item(s) added to cart'
                    }
                    firstButton={
                        removeModalClicked
                            ? 'yes'
                            : 'view cart'
                    }
                    secondButton={
                        removeModalClicked
                            ? 'cancel'
                            : 'continue shopping'
                    }
                    handleConfirmation={
                        removeModalClicked
                            ? () => closeModalnWishlist(selectedProductModal)
                            : toggleShowModal
                    }
                    category={selectedProductModal.category}
                    image={selectedProductModal.image}
                    name={selectedProductModal.name}
                    price={selectedProductModal.price}
                    redirect={
                        removeModalClicked
                            ? '/wishlist'
                            : '/cart'
                    }
                />
            )}
            <section className='py-5 md:px-28 bg-gray-100'>
                <div className='mx-4'>
                    <div className="text-xs text-gray-500 mb-7">
                        <Link href={"/"}>Funko</Link> / <span>Wishlist</span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-7 py-4">WISHLIST</h1>
                </div>
                <div className="py-5 my-8 grid xl:grid-cols-2 gap-4 mx-4">
                    <div className='lg:w-2/3 lg:mx-auto xl:w-full xl:mx-0'>
                        {wishlist.length === 0 ? (
                            <div className='bg-white text-center'>
                                <p className='font-semibold py-14'>The list is empty.</p>
                            </div>
                        ) : (
                            wishlist.map((product) => (
                                <div key={product.id} className='bg-white grid grid-cols-2 items-center py-5 gap-8 md:gap-14 border-b px-4'>
                                    <div className='relative mx-auto '>
                                        <div
                                            onClick={() => handleOpenModal(product.id)}
                                            className='absolute right-[-17px] z-40 cursor-pointer'>
                                            {isInWishlist(product.id)
                                                ? <AiFillHeart size={30} className='text-red-700' />
                                                : <AiOutlineHeart size={30} />
                                            }
                                        </div>
                                        <Link href={`/products/${product.name}`}>
                                            <img src={product.image}
                                                width={120} height={120}
                                                alt={product.name} className='mt-3'
                                            />
                                        </Link>
                                    </div>
                                    <div>
                                        <div className='flex flex-col gap-1 items-start justify-center sm:ms-3'>
                                            <p className='uppercase font-semibold'>{product.category}</p>
                                            <Link href={`/products/${product.name}`} className='font-extrabold uppercase text-start text-xl hover:underline'>{product.name}</Link>
                                            <p className='font-semibold'>${product.price}</p>
                                        </div>
                                        <div className='sm:w-2/3 xl:w-full'>
                                            {!isInCart(product.id) ? (
                                                <AddToCartButton
                                                    product={product}
                                                    textButton={"move to cart"}
                                                    className={'uppercase bg-black border-2 border-black text-white rounded-full w-full mt-3 py-2 px-4 font-bold hover:bg-white hover:text-black'}
                                                />
                                            ) : (
                                                <ButtonAdded
                                                    buttonText={'in cart'}
                                                    disabled={true}
                                                    product={product}
                                                    arrowPosition={'left-3'}
                                                    invert={'invert'}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {status === "authenticated" ? (
                        <div>
                            <ContactForm toast={toast} title={
                                <h2 className='font-extrabold text-4xl text-center uppercase mb-5 pb-5'>Contact Us</h2>
                            } />
                        </div>
                    ) : (
                        <div className='relative z-40'>
                            <div className='hidden xl:grid'>
                                <img
                                    src={'/icons/account-header.png'}
                                    alt='Welcome!'
                                    className='bg-account-header absolute top-[-37px] left-1/2 transform -translate-x-1/6 -translate-y-1/2 z-[-1] hover:-translate-y-[123px] transition duration-700'
                                />
                            </div>
                            {isLogin ? (
                                <Login onClick={toggleIsLogin} />
                            ) : (
                                <Register onClick={toggleIsLogin} />
                            )}
                        </div>
                    )}
                </div>
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
            />
        </div>
    );
};

export default Wishlist;
