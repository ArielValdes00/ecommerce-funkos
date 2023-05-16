import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
        callbackUrl: '/products', // Ruta de redirección personalizada
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              token.sessionId = user.sessionId;
            }
            return token;
          },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        }
    }
};
export default NextAuth(authOptions);