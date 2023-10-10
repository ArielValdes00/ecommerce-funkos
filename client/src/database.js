import Sequelize from "sequelize";
import pg from 'pg';

export const sequelize = new Sequelize(process.env.NEXT_PUBLIC_DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    dialectModule: pg

})

