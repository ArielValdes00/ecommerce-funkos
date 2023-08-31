import { Product } from "../models/Products.js";
import { uploadImage, oauth2Client, deleteImage } from "../utils/drive.js";
import fs from 'fs'

export const createProducts = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const imageUrl = await uploadImage(req.file);
        console.log(imageUrl)
        console.log(name)
        console.log(price)
        const product = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            image: imageUrl,
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
        const imageUrl = product.image;
        await Product.destroy({
            where: {
                id,
            },
        });
        const fileId = imageUrl.split("=")[1];
        await deleteImage(fileId);
        res.status(204).json({ message: "Product and image deleted successfully" });
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
            stock
        };
        await Product.update(updateData, {
            where: { id },
        });
        res.status(200).json({ message: "Product updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const generateUrl = async (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive",

        ],
    });
    res.redirect(url);
};

export const redirect = async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync("creds.json", JSON.stringify(tokens));
    res.send("success")
}



