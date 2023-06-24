import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv';
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";
import User from '../../../models/user'
import bcrypt from 'bcrypt'
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
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {

                const { email, password } = credentials;

                const user = await User.findOne({
                    where: {
                        email: email
                    }
                });
                console.log(user)

                if (!user) {
                    throw new Error("invalid email")
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password)

                if (!isPasswordMatched) {
                    throw new Error("invalid password")
                }
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    areaCode: user.areaCode,
                    phoneNumber: user.phoneNumber,
                };
                console.log(userData)

                return userData;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.areaCode = user.areaCode;
                token.phoneNumber = user.phoneNumber;
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
              id: token.id,
              name: token.name,
              email: token.email,
              areaCode: token.areaCode,
              phoneNumber: token.phoneNumber,
            };
            return session;
          }
    }
};

export default NextAuth({
    ...authOptions,
    adapter: SequelizeAdapter(sequelize),
});

