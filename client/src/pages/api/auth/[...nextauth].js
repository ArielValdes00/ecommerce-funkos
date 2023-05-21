import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dotenv from 'dotenv';
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";
dotenv.config();
const sequelize = new Sequelize('ecommerce_funko', 'root', 'arielvaldes0102', {
    host: 'localhost',
    dialect: 'mysql'
});

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

export default NextAuth({
    ...authOptions,
    adapter: SequelizeAdapter(sequelize)
  });
  
