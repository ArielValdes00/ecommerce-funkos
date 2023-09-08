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
        const purchaseHistory = user.Carts
            .filter(cartItem => cartItem.product !== null)
            .map(cartItem => ({
                productId: cartItem.product.id,
                productName: cartItem.product.name,
                productPrice: cartItem.product.price,
                productCategory: cartItem.product.category,
                productImage: cartItem.product.image,
                quantity: cartItem.quantity
            }));

        res.status(200).json({ purchaseHistory });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving purchase history' });
    }
}

export const getMostSoldProducts = async (req, res) => {
    try {
        const soldProducts = await Cart.findAll({
            include: {
                model: Product,
                attributes: ['id', 'name', 'price', 'category', 'image'],
            },
        });

        const productSalesMap = new Map();

        soldProducts.forEach(cartItem => {
            const productId = cartItem.product.id;
            const quantity = cartItem.quantity;

            if (productSalesMap.has(productId)) {
                productSalesMap.set(productId, productSalesMap.get(productId) + quantity);
            } else {
                productSalesMap.set(productId, quantity);
            }
        });

        const sortedProducts = [...productSalesMap.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([productId, quantity]) => ({
                productId,
                quantity,
                ...soldProducts.find(cartItem => cartItem.product.id === productId).product.dataValues,
            }));

        const last6MostSoldProducts = sortedProducts.slice(0, 6);

        res.status(200).json({ mostSoldProducts: last6MostSoldProducts });
    } catch (error) {
        console.log(error)
    }
};



