import React from 'react';
import BannerSocialMedia from "@/components/BannerSocialMedia"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Like from "../../../public/icons/heart.png"
import { productsSlider } from "@/data.js/data"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const products = () => {
    const [filteredProducts, setFilteredProducts] = useState(productsSlider);
    const [totalProducts, setTotalProducts] = useState(productsSlider.length);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (category === "all") {
            setFilteredProducts(productsSlider);
            setTotalProducts(productsSlider.length);
        } else {
            const filtered = productsSlider.filter(product => product.category === category);
            setFilteredProducts(filtered);
            setTotalProducts(filtered.length);
        }
    };

    const handleSortChange = (e) => {
        const sort = e.target.value;
        const sorted = [...filteredProducts].sort((a, b) => {
            if (sort === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setFilteredProducts(sorted);
    };
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = productsSlider.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchTerm(searchTerm);
        setFilteredProducts(filtered);
        setTotalProducts(filtered.length);
    };

    return (
        <>
            <Navbar />
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
                            <select id="sort" name="sort" onChange={handleSortChange} value={searchTerm} className="rounded-lg p-2 border border-gray-300">
                                <option value="asc">Low To High</option>
                                <option value="desc">High To Low</option>
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
                                <Link href={`/products/${product.id}`}>
                                    <Image src={Like} height={30} width={30} className="right-3 top-3 absolute cursor-pointer"></Image>
                                    <Image src={product.image} height={220} width={220} alt={product.name} className="mx-auto p-1"></Image>
                                    <p className="uppercase">{product.category}</p>
                                    <h3 className="font-extrabold">{product.name}</h3>
                                    <p className="font-semibold">${product.price}</p>
                                    <button className='border-2 border-gray-100 rounded-full px-3 py-2 mt-3 w-full bg-gray-100 font-bold hover:border-black'>ADD TO CART</button>
                                </Link>
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

export default products