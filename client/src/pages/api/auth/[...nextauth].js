import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { login } from '../../../../utils/apiUsers';
import { getUser } from '../../../../utils/apiUsers';
import { sequelize } from '@/database';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {
                    const user = await login(email, password);
                    return user;
                } catch (error) {
                    throw new Error(error.message);

                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    
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
                token.address = user.address;
                token.postalCode = user.postalCode;
                token.identificationNumber = user.identificationNumber;
                token.recipientName = user.recipientName;
                token.role = user.role;

            } else {
                const updatedUser = await getUser(token.id);
                token.name = updatedUser.name;
                token.email = updatedUser.email;
                token.areaCode = updatedUser.areaCode;
                token.phoneNumber = updatedUser.phoneNumber;
                token.address = updatedUser.address;
                token.postalCode = updatedUser.postalCode;
                token.identificationNumber = updatedUser.identificationNumber;
                token.recipientName = updatedUser.recipientName;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                areaCode: token.areaCode,
                phoneNumber: token.phoneNumber,
                address: token.address,
                postalCode: token.postalCode,
                identificationNumber: token.identificationNumber,
                recipientName: token.recipientName,
                role: token.role
            };
            return session;
        },
    }

};

export default NextAuth({
    ...authOptions,
    adapter: SequelizeAdapter(sequelize),
});
