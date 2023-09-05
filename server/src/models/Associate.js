import { User } from "./Users.js";
import { Product } from "./Products.js";
import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Cart = sequelize.define(
    "Cart",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: "cart",
    }
);

export const associateModels = () => {
    User.belongsToMany(Product, {
        through: "cart",
        foreignKey: "userId",
        otherKey: "productId",
    });
    Product.belongsToMany(User, {
        through: "cart",
        foreignKey: "productId",
        otherKey: "userId",
    });
    User.hasMany(Cart, { foreignKey: 'userId' });
    Product.hasMany(Cart, { foreignKey: 'productId' });
    Cart.belongsTo(Product, { foreignKey: 'productId' });
};






