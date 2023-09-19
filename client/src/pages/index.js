import React, { useContext } from 'react';
import BannerSocialMedia from "@/components/BannerSocialMedia";
import Navbar from "@/components/Navbar";
import SliderCards from "@/components/SliderCard";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import Footer from "@/components/Footer";
import { ProductContext } from '@/context/ProductContext';
import ModalPurchase from '@/components/miscellaneous/ModalPurchase';
import { getProducts } from '../../utils/apiProducts';
import { getMostSoldProducts } from '../../utils/apiPurchase';

export default function Home({ recentProducts, mostSoldProducts }) {
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
                    <div className="text-white flex flex-col gap-3 md:gap-5 justify-center items-start px-5 mt-5 lg:m-0">
                        <h1 className="text-2xl md:text-4xl font-extrabold w-full text-center lg:text-start">DOUBLE TROUBLE</h1>
                        <p className="font-semibold text-sm md:text-xl max-w-xs md:max-w-md text-center lg:text-start mx-auto lg:m-0">Put Your Training to Good Use! Team Up with the 2-Pack Pop! Yuji Itadori & Aoi Todo and Complete Your Anime Set. </p>
                        <Link href={"/products"} className='pt-1 lg:pt-3 mx-auto lg:m-0'>
                            <button className="text-sm rounded-full bg-white text-black px-4 py-2 font-bold border-2 border-white hover:border-black">SHOP COLLECTION</button>
                        </Link>
                    </div>
                    <div className="mx-auto">
                        <img src={'/fondo-funko.png'} height={450} width={450} alt="background-image" />
                    </div>
                </div>
            </section>
            <section className='bg-gray-100'>
                <SliderCards title={"new arrival"} products={recentProducts} />
                <SliderCards title={"best selling"} products={mostSoldProducts} />
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

export async function getServerSideProps(context) {
    try {
        const limit = 6;
        const recentProducts = await getProducts(limit);

        const mostSoldProducts = await getMostSoldProducts();

        return {
            props: {
                recentProducts,
                mostSoldProducts,
            },
        };
    } catch (error) {
        console.error(error);

        return {
            props: {
                recentProducts: [],
                mostSoldProducts: [],
            },
        };
    }
}


