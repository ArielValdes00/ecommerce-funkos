import React, { useContext } from 'react';
import BannerSocialMedia from "@/components/BannerSocialMedia";
import FondoFunko from "../../public/Nightwing.png";
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
            <section className="bg-sky-800 grid min-h-screen" style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>
                <div className="grid lg:grid-cols-2 gap-7 items-center md:px-28">
                    <div className="text-white flex flex-col gap-3 justify-center items-start px-5 mt-5">
                        <h3 className="font-semibold text-sm md:text-xl w-full">GOTHAM KNIGHTS</h3>
                        <h1 className="text-lg md:text-4xl font-extrabold w-full">WINGS OF VENGEANCE</h1>
                        <p className="font-semibold text-sm md:text-xl">Pass the Baton to a New Hero! Collect Pop! Nightwing and Other Crusaders for Your DC Comics Set.</p>
                        <Link href={"/products"} className='pt-3'>
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


