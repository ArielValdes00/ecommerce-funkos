import React from 'react';
import BannerSocialMedia from "@/components/BannerSocialMedia";
import FondoFunko from "../../public/Nightwing.png";
import Navbar from "@/components/Navbar";
import SliderCards from "@/components/SliderCard";
import Image from "next/image";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import Footer from "@/components/Footer";

export default function Home() {
    const { data: session } = useSession();

    return (
        <div>
            <Navbar session={session} />
            <section className="bg-red-700 ">
                <div className="grid lg:grid-cols-2 md:px-28">
                    <div className="text-white flex flex-col justify-evenly items-start p-3 mt-5">
                        <h3 className="font-semibold text-sm md:text-xl w-full">GOTHAM KNIGHTS</h3>
                        <h1 className="text-lg md:text-4xl font-extrabold w-full">WINGS OF VENGEANCE</h1>
                        <p className="font-semibold text-sm md:text-xl">Pass the Baton to a New Hero! Collect Pop! Nightwing and Other Crusaders for Your DC Comics Set.</p>
                        <Link href={"/products"} className='pt-3'>
                            <button className="text-sm rounded-full bg-white text-black px-4 py-2 font-bold border-2 border-white hover:border-black">SHOP COLLECTION</button>
                        </Link>
                    </div>
                    <div className="mx-auto">
                        <Image src={FondoFunko} height={400} width={400} alt="fondo"></Image>
                    </div>
                </div>
            </section>
            <section>
                <SliderCards title={"NEW ARRIVAL"} />
                <SliderCards title={"BEST SELLING"} />
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


