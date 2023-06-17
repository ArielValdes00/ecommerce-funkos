import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Delete from '../../public/icons/delete.png'
import EmptyCart from '../../public/icons/empty-cart.png'
import Image from 'next/image';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { purchase } from '../../utils/apiPurchase';
import SelectQuantity from '@/components/SelectQuantity';
import ModalPurchase from '@/components/ModalPurchase';
import SliderCards from '@/components/SliderCard';

const Cart = () => {
    const { cartState, removeItemFromCart, removeAllItemsFromCart, setSelectedProductModal, selectedProductModal, setShowModal, addItemToCart, setSelectedQuantity, selectedQuantities, showModal } = useContext(ProductContext);
    const cart = cartState.cart;
    const [userId, setUserId] = useState(null)
    const [productIds, setProductIds] = useState([])
    const { data: session, status } = useSession();
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleQuantityChange = (productId, newQuantity) => {
        addItemToCart(productId, newQuantity);
        setSelectedQuantity(productId, newQuantity)
        setShowModal(false);
    };

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            setUserId(session.user.id);
        }
        const newProductIds = []
        for (const product of cart) {
            const productId = product.id;

            newProductIds.push(productId)
        }
        setProductIds(newProductIds)
    }, [])

    const openDeleteModal = (id) => {
        const { cart } = cartState;
        const productToFind = cart.find(product => product.id === id);
        setShowModal(true);
        setSelectedProductId(id);
        setSelectedProductModal(productToFind)
    };

    const handlePurchase = async (e) => {
        e.preventDefault()
        try {
            const res = await purchase(userId, productIds)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Navbar session={session} />
            {showModal && (
                <ModalPurchase
                    title={'are you sure you want to remove the following product from the cart?'}
                    firstButton={'yes'}
                    secondButton={'cancel'}
                    handleConfirmation={() => removeItemFromCart(selectedProductId)}
                    price={`${selectedQuantities[selectedProductModal.id] ? (selectedProductModal.price * selectedQuantities[selectedProductModal.id]).toFixed(2) : selectedProductModal.price}`}
                    image={selectedProductModal.image}
                    name={selectedProductModal.name}
                    quantity={`quantity: ${selectedQuantities[selectedProductModal.id] || 1}`}
                    redirect={'/cart'}
                />
            )}
            <section className="py-5">
                <div className="px-4 md:px-28 mb-7">
                    <div className="text-xs text-gray-500 mb-5">
                        <Link href={"/"}>Funko</Link> / <span>Cart</span>
                    </div>
                    <h1 className="uppercase font-extrabold text-5xl">my cart</h1>
                </div>
                {cart.length >= 1 ? (
                    <>
                        <div className="px-4 md:px-28">
                            <div className="grid grid-cols-6 items-center border-b-2 border-black uppercase font-extrabold text-lg py-5">
                                <p className="col-span-4">Item</p>
                                <p className="col-span-1 text-center">Quantity</p>
                                <p className="col-span-1 lg:ml-auto">Price</p>
                            </div>
                            {cart.map((item) => (
                                <div key={item.id} className="grid md:grid-cols-2 items-center border-b-2 border-black ">
                                    <div className="grid grid-cols-3 gap-7 items-center lg:gap-5 py-3 md:col-span-1">
                                        <Link href={`/products/${item.name}`} className="col-span-1">
                                            <img src={item.image} height={130} width={130} alt={item.name} />
                                        </Link>
                                        <div className="col-span-2">
                                            <p className="uppercase font-semibold text-lg">{item.category}</p>
                                            <Link href={`/products/${item.name}`} className="text-center uppercase md:text-2xl text-4xl font-extrabold hover:underline">{item.name}</Link>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 py-3 items-center md:col-span-1">
                                        <button onClick={() => openDeleteModal(item.id)}>
                                            <Image src={Delete} height={28} width={28} alt="Delete" />
                                        </button>
                                        <div className="mx-auto w-1/3">
                                            <SelectQuantity
                                                selectedQuantity={selectedQuantities[item.id] || 1}
                                                handleQuantityChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                                classNameContainer="w-full select-container focus:outline-none font-bold"
                                                className="bg-gray-100 rounded-full w-full h-full text-center pl-5"
                                            />
                                        </div>
                                        <p className="ml-auto font-extrabold text-lg me-2">${item.price * item.quantity}.00</p>
                                    </div>
                                </div>
                            ))}
                            <p className="text-xl font-bold uppercase text-center mt-5 py-3">Total price: ${cartState.totalPrice}.00</p>
                            <div className="flex items-center justify-center gap-5 py-5">
                                <button onClick={handlePurchase} type="submit" className="px-8 py-2 rounded-full bg-blue-700 text-white shadow-lg uppercase font-semibold shadow-lg">Checkout</button>
                                <button onClick={removeAllItemsFromCart} className="px-7 py-2 rounded-full bg-red-700 text-white shadow-lg uppercase font-semibold">Empty Cart</button>
                            </div>
                        </div>
                        <div className="py-5 text-center bg-white">
                            <SliderCards title="you might also like" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-16 items-center justify-center bg-gray-100 w-full">
                            <p className="font-bold text-3xl md:text-5xl text-center pt-5 mt-5">YOUR CART IS EMPTY</p>
                            <div className="py-3 pb-5">
                                <Link href={"/products"} className="px-10 py-3 bg-black text-white rounded-full text-center font-bold text-xl hover:bg-white hover:text-black border-2 border-black"> CONTINUE SHOPPING</Link>
                            </div>
                            <Image src={EmptyCart} height={315} width={315} alt="Wall-e" />
                        </div>
                        <div className="py-5 text-center bg-white">
                            <SliderCards title="check these out!" />
                        </div>
                    </>
                )}
            </section>
            <BannerSocialMedia />
            <Footer />
        </>
    );
};

export default Cart;
