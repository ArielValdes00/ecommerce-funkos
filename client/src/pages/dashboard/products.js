import { getProducts } from "../../../utils/api"
import { useState, useEffect } from "react";

const products = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProducts();
            setProduct(data);
            console.log(data)
        }
        fetchProduct()
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

return (
    <div>
        <h1 className="text-center text-4xl m-3">
            PRODUCTS
        </h1>
        <div className="w-full max-w-md mx-auto text-center border p-3">
            <form className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block">Name:</label>
                    <input type="text" name="name" className="border" />
                </div>
                <div>
                    <label htmlFor="price" className="block">Price:</label>
                    <input type="text" name="price" className="border" />
                </div>
                <div>
                    <label htmlFor="description" className="block">Description:</label>
                    <input type="text" name="description" className="border" />
                </div>
                <div>
                    <label htmlFor="category" className="block">Category:</label>
                    <input type="text" name="category" className="border" />
                </div>
                <div>
                    <label htmlFor="stock" className="block">Stock:</label>
                    <input type="text" name="stock" className="border" />
                </div>
                <div className="col-span-2">
                    <button className="bg-blue-500 text-white rounded px-4 py-2">Create product</button>
                </div>
            </form>

        </div>
        <div className="flex">
            {product.map((product) => (
                <div key={product.id} className="border rounded p-3 m-3">
                    <h3>Name: {product.name}</h3>
                    <p>Price {product.price}</p>
                    <p>Description {product.description}</p>
                    <p>Category {product.category}</p>
                    <p>Stock {product.stock}</p>
                </div>
            ))}
        </div>
    </div>
)
}

export default products