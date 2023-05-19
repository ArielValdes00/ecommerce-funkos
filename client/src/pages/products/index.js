import React from 'react';
import BannerSocialMedia from "@/components/BannerSocialMedia"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Like from "../../../public/icons/heart.png"
import { getProducts } from '../../../utils/apiProducts';
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { ProductContext } from '../../context/ProductContext';
import { useSession } from 'next-auth/react';

const Products = ({ initialProducts }) => {
    const { data: session } = useSession();
    const { updateProducts, filteredProducts, handleCategoryChange, handleSortChange, handleSearchChange, totalProducts, addItemToCart} = useContext(ProductContext);

    useEffect(() => {
        updateProducts(initialProducts);
    }, []);

    return (
        <>
            <Navbar session={session} />
            <section className="px-28 py-5">
                <div className="text-xs text-gray-500 mb-5">
                    <Link href={"/"}>Funko</Link> / <span>Products</span>
                </div>
                <h1 className="text-5xl font-extrabold mb-7 py-4">PRODUCTS</h1>
                <div className="bg-gray-100 p-4 mb-8">
                    <div className="flex items-center mx-7 gap-8">
                        <div>
                            <label htmlFor="category" className="mr-3 font-extrabold text-lg">CATEGORY:</label>
                            <select id="category" name="category" onChange={handleCategoryChange} className="rounded-lg p-2 border border-gray-300">
                                <option value="all">All</option>
                                <option value="marvel">Marvel</option>
                                <option value="disney">Disney</option>
                                <option value="anime">Anime</option>
                                <option value="dc comics">DC Comics</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sort" className="mr-3 font-extrabold text-lg">SORT BY:</label>
                            <select id="sort" name="sort" onChange={handleSortChange} className="rounded-lg p-2 border border-gray-300">
                                <option value="asc">Low To High</option>
                                <option value="desc">High To Low</option>
                                <option value="recent">Latest</option>
                            </select>
                        </div>
                        <div className="flex items-center rounded-lg px-2 ">
                            <label htmlFor="search" className="mr-2 font-extrabold text-lg">SEARCH:</label>
                            <input
                                id="search"
                                name="search"
                                type="text"
                                onChange={handleSearchChange}
                                className="p-2 rounded-lg border border-gray-300 outline-none focus:border-black"
                            />
                        </div>
                        <div className="ml-auto">
                            <p className="font-semibold text-lg">{`(${totalProducts}) Results`}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mx-6 py-5">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="rounded-lg bg-white text-center p-5 border relative">
                                <Image src={Like} height={30} width={30} alt="like" className="right-3 top-3 absolute cursor-pointer"></Image>
                                <Link href={`/products/${product.name}`}><img src={product.image} alt={product.name} className='hover:scale-110 transition-transform duration-300'></img></Link>
                                <p className="uppercase">{product.category}</p>
                                <Link href={`/products/${product.name}`}><h3 className="font-extrabold uppercase hover:underline">{product.name}</h3></Link>
                                <p className="font-semibold">${product.price}</p>
                                <button onClick={() => addItemToCart(product.id)} className='border-2 border-gray-100 rounded-full px-3 py-2 mt-3 w-full bg-gray-100 font-bold hover:border-black'>ADD TO CART</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <BannerSocialMedia />
            <Footer />
        </>
    )
}
export async function getStaticProps() {
    const products = await getProducts();
    return {
        props: {
            initialProducts: products,
        },
    };
}

export default Products