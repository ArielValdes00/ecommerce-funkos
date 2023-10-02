import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { ProductProvider } from '../context/ProductContext.js';
import Head from 'next/head';
import Footer from '@/components/Footer.js';
import BannerSocialMedia from '@/components/BannerSocialMedia.js';
import Navbar from '@/components/Navbar.js';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const showNavFooterBanner = router.pathname !== '/dashboard';

    return (
        <ProductProvider>
            <SessionProvider session={pageProps.session}>
                <Head>
                    <title>Funko Store</title>
                    <link rel="icon" href="/logo-title.png" />
                    <meta name="description" content="" />
                    <meta property="og:title" content="Funko Store" />
                    <meta property="og:description" content="" />
                    <meta property="og:image" content="" />
                    <meta property="og:url" content="" />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:site_name" content="Funko Store" />
                    <meta name="keywords" content="" />
                    <meta name="author" content="Ariel Valdés" />
                </Head>
                {showNavFooterBanner && <Navbar session={pageProps.session} />}
                <Component {...pageProps} />
                {showNavFooterBanner && <BannerSocialMedia />}
                {showNavFooterBanner && <Footer />}
            </SessionProvider>
        </ProductProvider>
    );
}

export default MyApp;
