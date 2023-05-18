import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { ProductProvider } from '../context/ProductContext.js';

function MyApp({ Component, pageProps }) {
    return (
        <ProductProvider>
            <SessionProvider>
                <Component {...pageProps} />
            </SessionProvider>
        </ProductProvider>
    );
}

export default MyApp;
