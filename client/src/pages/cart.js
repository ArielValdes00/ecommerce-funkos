import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import { getMostSoldProducts } from '../../utils/apiPurchase';
import SelectQuantity from '@/components/SelectQuantity';
import ModalPurchase from '@/components/miscellaneous/ModalPurchase';
import SliderCards from '@/components/SliderCard';
import ProgressBar from '@/components/ProgressBar';
import { useRouter } from 'next/router';
import { getProducts } from '../../utils/apiProducts';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BiSolidCheckShield } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalPayPal from '@/components/ModalPayPal';
import useBooleanState from '@/hooks/useBooleanState';

const Cart = ({ recentProducts, mostSoldProducts, session }) => {
    const { cartState, cartDispatch,
        removeAllItemsFromCart,
        removeItemFromCart,
        setSelectedQuantities,
        setSelectedProductModal,
        selectedProductModal,
        toggleShowModal,
        addItemToCart,
        setSelectedQuantity,
        selectedQuantities,
        showModal } = useContext(ProductContext);
    const cart = cartState.cart;
    const [userId, setUserId] = useState(session?.user.id);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [shippingCost, setShippingCost] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const totalItems = Object.values(selectedQuantities).reduce((acc, curr) => acc + curr, 0);
    const estimatedTotal = String(cartState.totalPrice + (cartState.totalPrice >= 50 ? '.00' : 6.95));
    const [checkoutProcess, toggleCheckoutProcess] = useBooleanState(false);
    const router = useRouter();

    useEffect(() => {
        const priceShipping = cartState.totalPrice >= 50 ? 'FREE' : '6.95';
        setShippingCost(priceShipping === 'FREE' ? 0 : parseFloat(priceShipping));
    }, [cartState]);

    useEffect(() => {
        const calculateTotalItems = () => {
            const local = localStorage.getItem('selectedQuantities');
            if (local) {
                const parsedLocal = JSON.parse(local);
                setSelectedQuantities(parsedLocal);
            }
        };
        cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });
        calculateTotalItems();
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        addItemToCart(productId, newQuantity);
        setSelectedQuantity(productId, newQuantity);
        toggleShowModal();
    };

    const openDeleteModal = (id) => {
        const { cart } = cartState;
        const productToFind = cart.find(product => product.id === id);
        toggleShowModal();
        setSelectedProductId(id);
        setSelectedProductModal(productToFind);
    };

    const handlePurchase = async (e) => {
        if (!userId) {
            router.push('/login');
        } else {
            toggleCheckoutProcess();
        }
    }

    return (
        <>
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
            <section className="py-5 ">
                <div className="mb-7 md:px-28 mx-4">
                    <div className="text-xs text-gray-500 mb-7">
                        <Link href={"/"}>Funko</Link> / <span>Cart</span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-7 py-4">MY CART</h1>
                </div>
                {cart.length >= 1 ? (
                    <>
                        <div className="px-4 md:px-28">
                            <div className='grid xl:grid-cols-5 grid-cols-1 gap-8'>
                                <div className='xl:col-span-3'>
                                    <div className="grid grid-cols-6 items-center border-b-2 border-black uppercase font-extrabold text-lg py-5">
                                        <p className="md:col-span-4 col-span-2">Item</p>
                                        <p className="md:col-span-1 col-span-2 text-center md:text-center">Qty</p>
                                        <p className="md:col-span-1 col-span-2 ml-auto">Total</p>
                                    </div>
                                    {cart.map((item) => (
                                        <div key={item.id} className="grid md:grid-cols-2 items-center border-b-2 border-black mb-2">
                                            <div className="grid grid-cols-3 gap-7 items-center lg:gap-5 py-3 md:col-span-1">
                                                <Link href={`/products/${item.name}`} className="col-span-1">
                                                    <img src={item.image} height={130} width={130} alt={item.name} />
                                                </Link>
                                                <div className="col-span-2">
                                                    <p className="uppercase font-semibold lg:text-lg">{item.category}</p>
                                                    <Link href={`/products/${item.name}`} className="text-center uppercase md:text-2xl text-3xl font-extrabold hover:underline">{item.name}</Link>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 py-3 items-center md:col-span-1">
                                                <button onClick={() => openDeleteModal(item.id)} className='md:mx-auto'>
                                                    <BsFillTrash3Fill size={27} />
                                                </button>
                                                <div className="w-1/2 mx-auto">
                                                    <SelectQuantity
                                                        selectedQuantity={selectedQuantities[item.id] || 1}
                                                        handleQuantityChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                                        classNameContainer="select-container relative"
                                                        className="bg-gray-100 rounded-full w-full h-full pl-10 md:pl-6 lg:pl-7 text-start sm:text-center xl:text-start font-semibold border border-black"
                                                        arrowPosition={'left-5 sm:left-7 md:left-3 lg:left-4 xl:left-3 invert-1'}
                                                        invert={'invert-0'}
                                                    />
                                                </div>
                                                <p className="ml-auto font-extrabold text-lg me-2">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='xl:col-span-2 mt-3'>
                                    <ProgressBar
                                        totalPrice={cartState.totalPrice}
                                    />
                                    <div className='bg-gray-100 rounded-lg pt-6 pb-2 px-6 flex flex-col gap-5 text-lg'>
                                        <div className='grid grid-cols-2 border-b-2 pb-3'>
                                            <p className='font-extrabold text-3xl'>SUMMARY</p>
                                            <p className='ml-auto font-semibold'>{totalItems} ITEMS</p>
                                        </div>
                                        <p className='text-sm border-b-2 pb-3'>By clicking checkout, I understand that all sales are final.</p>
                                        <div className='grid grid-cols-2 font-semibold'>
                                            <p>SUB TOTAL</p>
                                            <span className='ml-auto'>${cartState.totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className='grid grid-cols-2 font-semibold'>
                                            <p>SHIPPING</p>
                                            <span className='ml-auto'>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                                        </div>
                                        <div className='grid grid-cols-2 font-extrabold'>
                                            <p className='text-xl'>Estimated Total</p>
                                            <span className='ml-auto'>${estimatedTotal}</span>
                                        </div>
                                        <button
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            onClick={handlePurchase}
                                            className='flex justify-center items-center gap-3 text-lg border-2 uppercase rounded-full px-3 py-2 mt-3 w-full font-extrabold border-black hover:bg-white hover:text-black bg-black text-white'>
                                            {<BiSolidCheckShield size={26} className={`${isHovered ? '' : 'text-white'}`} />}
                                            SECURE CHECKOUT
                                        </button>
                                        <div>
                                            {checkoutProcess &&
                                                <ModalPayPal
                                                    cart={cart}
                                                    userId={userId}
                                                    estimatedTotal={estimatedTotal}
                                                    shippingCost={shippingCost}
                                                    toggleCheckoutProcess={toggleCheckoutProcess}
                                                    removeAllItemsFromCart={removeAllItemsFromCart}
                                                    toast={toast}
                                                    session={session}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-5 text-center bg-white mx-3 px-0">
                            <SliderCards title="you might also like" products={mostSoldProducts} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-16 items-center justify-center bg-gray-100 w-full">
                            <p className="font-bold text-3xl md:text-5xl text-center pt-5 mt-5">YOUR CART IS EMPTY</p>
                            <div className="py-3 pb-5">
                                <Link href={"/products"} className="px-10 py-3 bg-black text-white rounded-full text-center font-bold text-xl hover:bg-white hover:text-black border-2 border-black"> CONTINUE SHOPPING</Link>
                            </div>
                            <picture>
                                <source media="(min-width: 768px)" srcSet="https://funko.com/on/demandware.static/-/Sites-FunkoUS-Library/default/dw7eb32f71/images/funko/content-asset/empty-cart-wall-e.png" />
                                <img alt="empty cart character" className="w-full h-auto" fetchpriority="high" src="https://funko.com/on/demandware.static/-/Sites-FunkoUS-Library/default/dw7eb32f71/images/funko/content-asset/empty-cart-wall-e.png" title="" />
                            </picture>
                        </div>
                        <div className="py-5 text-center bg-white mx-3">
                            <SliderCards title="check these out!" products={recentProducts} />
                        </div>
                    </>
                )}
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
        </>
    );
};

export async function getServerSideProps(context) {
    
    try {
        const limit = 6;
        const recentProducts = await getProducts(limit);
        const session = await getSession(context);
        const mostSoldProducts = await getMostSoldProducts();

        return {
            props: {
                recentProducts,
                mostSoldProducts,
                session,
            },
        };
    } catch (error) {
        console.error(error);

        return {
            props: {
                recentProducts: [],
                mostSoldProducts: [],
                session,
            },
        };
    }
}

export default Cart;
