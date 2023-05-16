import { Product } from "../models/Products.js";
import { uploadImage } from './googleDrive.js';

export const createProducts = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const imageUrl = await uploadImage(req.file); // Obtener la URL pública de la imagen subida a Google Drive
        const product = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            image: imageUrl, // Guardar la URL pública de la imagen en la base de datos
        });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({
            where: {
                id,
            }
        })
        res.status(204).json({ message: "Product deleted succesfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, image } = req.body;
        await Product.findOne({
            where: {
                id,
            }
        })
        await Product.update(
            { name, description, price, category, stock, image },
            { where: { id } }
        );
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: {
                id,
            }
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


