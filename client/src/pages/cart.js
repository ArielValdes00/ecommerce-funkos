import React from 'react';
import { useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Delete from '../../public/icons/delete.png'
import Image from 'next/image';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';

const Cart = () => {
    const { cartState, removeItemFromCart, incrementQuantity, decrementQuantity, removeAllItemsFromCart } = useContext(ProductContext);
    const cart = cartState.cart;
    const { data: session } = useSession();
    console.log(cart.length)
    return (
        <>
            <Navbar session={session} />
            <section className='py-5'>
                <div className='md:px-28 mb-7'>
                    <div className="text-xs text-gray-500 mb-5">
                        <Link href={"/"}>Funko</Link> / <span>Cart</span>
                    </div>
                    <h1 className='uppercase font-extrabold text-5xl'>my cart</h1>
                </div>
                {cart.length >= 1 ? (
                    <div className='md:px-28'>
                        <div className='grid grid-cols-5 items-center border-b-2 border-black uppercase font-extrabold text-lg py-5'>
                            <p className='col-span-2'>Item</p>
                            <p className='col-start-4 ml-auto'>Quantity</p>
                            <p className='col-start-5 ml-auto'>Price</p>
                        </div>
                        {cart.map((item) => (
                            <div key={item.id} className='grid grid-cols-5 items-center border-b-2 border-black '>
                                <div className='mr-auto flex gap-3 col-span-2'>
                                    <Link href={`/products/${item.name}`} className='mr-auto'>
                                        <img src={item.image} height={130} width={130} alt={item.name} />
                                    </Link>
                                    <div className='flex flex-col justify-center'>
                                        <p className='uppercase font-semibold'>{item.category}</p>
                                        <Link href={`/products/${item.name}`} className='text-center uppercase text-3xl font-extrabold hover:underline'>{item.name}</Link>
                                    </div>
                                </div>
                                <button onClick={() => removeItemFromCart(item.id)} className='ml-auto right-5'>
                                    <Image src={Delete} height={40} width={40} alt='Delete'></Image>
                                </button>
                                <div className='flex items-center justify-center rounded-full ml-auto'>
                                    <button onClick={() => incrementQuantity(item.id)} className='text-xl font-bold px-2 border-2 border-black'>+</button>
                                    <p className='border-y-2 px-3 border-black text-xl font-semibold'>{item.quantity}</p>
                                    <button onClick={() => decrementQuantity(item.id)} className='text-xl font-bold px-2 border-2 border-black'>-</button>
                                </div>
                                <p className='ml-auto font-extrabold text-lg me-2'>${item.price * item.quantity}.00</p>
                            </div>
                        ))}
                        <div className='flex items-center justify-center gap-5 py-5 relative'>
                            <button className='px-8 py-2 rounded-full bg-blue-700 text-white shadow-lg uppercase font-semibold shadow-lg'>Checkout</button>
                            <button onClick={removeAllItemsFromCart} className='px-7 py-2 rounded-full bg-red-700 text-white shadow-lg uppercase font-semibold'>Empty Cart</button>
                            <p className='text-lg font-bold uppercase absolute right-0'>Total price: ${cartState.totalPrice}.00</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-7 items-center h-96 justify-center bg-gray-100 w-full'>
                        <p className='font-bold text-5xl py-5'>YOUR CART IS EMPTY</p>
                        <Link href={"/products"} className='w-1/3 px-5 py-3 bg-black text-white rounded-full text-center font-bold text-xl hover:bg-white hover:text-black border-2 border-black'> CONTINUE SHOPPING</Link>
                    </div>
                )
                }

            </section>
            <BannerSocialMedia />
            <Footer />
        </>
    );
};

export default Cart;
