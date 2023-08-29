import { User } from "../models/Users.js";
import { Product } from "../models/Products.js";
import { Cart } from "../models/Associate.js";

export const handlePurchase = async (req, res) => {
    const { userId, order } = req.body;

    const products = order.purchase_units[0].items;

    try {
        for (const product of products) {
            const { sku, quantity } = product;

            const productInstance = await Product.findByPk(sku);

            if (productInstance) {
                const parsedQuantity = parseInt(quantity);

                await Cart.create({
                    userId: userId, 
                    productId: productInstance.id,
                    quantity: parsedQuantity
                });
            }
        }

        console.log('Order processing completed');
        res.status(200).json({ message: 'Order processed successfully' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ error: 'Error processing order' });
    }
}

export const getUserPurchaseHistory = async (req, res) => {
    const { userId } = req.body;
    console.log(userId)

    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Cart,
                include: {
                    model: Product 
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const purchaseHistory = user.Carts.map(cartItem => ({
            productId: cartItem.product.id,
            productName: cartItem.product.name,
            productPrice: cartItem.product.price,
            productCategory: cartItem.product.category,
            productImage: cartItem.product.image,
            quantity: cartItem.quantity
        }));

        res.status(200).json({ purchaseHistory });
    } catch (error) {
        console.error('Error retrieving purchase history:', error);
        res.status(500).json({ error: 'Error retrieving purchase history' });
    }
}


