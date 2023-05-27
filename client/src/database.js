import Sequelize from "sequelize";

export const sequelize = new Sequelize('ecommerce_funko', 'root', 'arielvaldes0102', {
    host: 'localhost',
    dialect: 'mysql'
});
