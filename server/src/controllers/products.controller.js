import { Product } from "../models/Products.js";
import { uploadImageToCloudinary } from "../config/uploadImagenToCloudinary.js";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createProducts = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        let imageUrl, boxImageUrl;

        if (req.files['image']) {
            imageUrl = await uploadImageToCloudinary(req.files['image'][0]);
        }

        if (req.files['boxImage']) {
            boxImageUrl = await uploadImageToCloudinary(req.files['boxImage'][0]);
        }

        const product = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            image: imageUrl,
            boxImage: boxImageUrl,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getProduct = async (req, res) => {
    try {
        const productName = req.params.name;
        const product = await Product.findOne({
            where: { name: productName },
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let products;
        if (limit && limit > 0) {
            products = await Product.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
            });
        } else {
            products = await Product.findAll();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id } });

        await Product.destroy({
            where: {
                id,
            },
        });
        res.status(204).json({ message: 'Product and image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;
        const decimalPrice = parseFloat(price);
        const updateData = {
            name,
            price: decimalPrice,
            description,
            category,
            stock,
        };
        await Product.update(updateData, {
            where: { id },
        });
        
        const updatedProduct = await Product.findOne({ where: { id } });

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

