import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Product = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    description: {
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    }

})