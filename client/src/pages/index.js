import FondoFunko from "../../public/Nightwing.png";
import Navbar from "@/components/Navbar";
import SliderCards from "@/components/SliderCard";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div>
        <Navbar />
        <section className=" bg-red-700">
            <div className="grid grid-cols-2 px-28">
                <div className="py-20 pr-32 text-white flex flex-col justify-evenly items-start">
                    <h3 className="text-xl font-normal">GOTHAM KNIGHTS</h3>
                    <h1 className="text-4xl font-extrabold ">WINGS OF VENGEANCE</h1>
                    <p className="text-xl font-normal">Pass the Baton to a New Hero! Collect Pop! Nightwing and Other Crusaders for Your DC Comics Set.</p>
                    <Link href={""} className="rounded-full bg-white text-black px-5 py-3 font-bold border border-white hover:border-black">SHOP COLLECTION</Link>
                </div>
                <div className="ml-7">
                    <Image src={FondoFunko} height={450} width={450} alt="fondo"></Image>
                </div>
            </div>
        </section>
        <section>
            <SliderCards/>
        </section>
    </div>
  )
}
