import React, { useContext } from 'react';
import BannerSocialMedia from "@/components/BannerSocialMedia";
import FondoFunko from "../../public/fondoFunko.png";
import Navbar from "@/components/Navbar";
import SliderCards from "@/components/SliderCard";
import Image from "next/image";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import Footer from "@/components/Footer";
import { ProductContext } from '@/context/ProductContext';
import ModalPurchase from '@/components/ModalPurchase';

export default function Home() {
    const { data: session } = useSession();
    const { showModal, selectedProductModal, closeModal } = useContext(ProductContext);
    return (
        <div>
            <Navbar session={session} />
            {showModal && (
                <ModalPurchase
                    title={'item(s) added to cart'}
                    name={selectedProductModal.name}
                    image={selectedProductModal.image}
                    price={selectedProductModal.price}
                    quantity={'quantity: 1'}
                    firstButton={'view cart'}
                    secondButton={'continue shopping'}
                    handleConfirmation={closeModal}
                    redirect={'/cart'}
                />
            )}
            <section className="fondo grid min-h-screen md:px-28" style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>
                <div className="grid lg:grid-cols-2 lg:gap-7 items-center">
                    <div className="text-white flex flex-col gap-5 justify-center items-start px-5 mt-5 lg:m-0">
                        <h1 className="text-lg md:text-4xl font-extrabold w-full text-center lg:text-start">MAXIMUM VOLTAGE</h1>
                        <p className="font-semibold text-sm md:text-xl mx-auto lg:m-0">Light Up Your DC Comic Set.</p>
                        <Link href={"/products"} className='pt-3 mx-auto lg:m-0'>
                            <button className="text-sm rounded-full bg-white text-black px-4 py-2 font-bold border-2 border-white hover:border-black">SHOP COLLECTION</button>
                        </Link>
                    </div>
                    <div className="mx-auto">
                        <Image src={FondoFunko} height={450} width={450} alt="fondo"></Image>
                    </div>
                </div>
            </section>
            <section className='bg-gray-100'>
                <SliderCards title={"new arrival"} />
                <SliderCards title={"best selling"} />
            </section>
            <section>
                <BannerSocialMedia />
            </section>
            <section>
                <Footer />
            </section>
        </div>
    )
}


