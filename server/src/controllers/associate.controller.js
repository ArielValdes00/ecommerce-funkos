import { Product } from "../models/Products.js"
import { User } from "../models/Users.js";

export const handlePurchase = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findByPk(userId);
        const products = await Product.findAll({
            where: {
                id: productId
            }
        });

        if (!user || !products) {
            return res.status(404).send("Usuario o producto no encontrado");
        }

        await user.addProduct(products);

        res.send('Compra realizada con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
}



