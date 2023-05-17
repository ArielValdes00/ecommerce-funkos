import { Product } from "../models/Products.js";
import { uploadImage, oauth2Client } from "../utils/drive.js";
import fs from 'fs'

export const createProducts = async (req, res) => {

    try {
        const { name, price, description, category, stock } = req.body;
        const imageUrl = await uploadImage(req.file);
        const product = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            image: imageUrl,
        });
        console.log('product:', product);
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
    const {code} = req.query;
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync("creds.json", JSON.stringify(tokens));
    res.send("succes")
 }



