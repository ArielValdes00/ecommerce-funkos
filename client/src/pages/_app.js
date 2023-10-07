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
                    <meta name="description" content="An ecommerce website specializing in Funko collectibles. Explore our wide range of Funko products, featuring a shopping cart system, wishlist functionality, user sessions, and user profiles with purchase history. Securely pay using the PayPal API. Admin users can access a dashboard displaying weekly sales data, recent orders, total revenue, and weekly earnings. Manage products, view user purchase history, and access public user data. Only super-admins can modify the dashboard." />
                    <meta property="og:title" content="Funko Store" />
                    <meta property="og:description" content="An ecommerce website specializing in Funko collectibles. Explore our wide range of Funko products, featuring a shopping cart system, wishlist functionality, user sessions, and user profiles with purchase history. Securely pay using the PayPal API. Admin users can access a dashboard displaying weekly sales data, recent orders, total revenue, and weekly earnings. Manage products, view user purchase history, and access public user data. Only super-admins can modify the dashboard." />
                    <meta property="og:image" content="https://res.cloudinary.com/dnczjmsbt/image/upload/v1696624917/bg-ecommerce_wjk5ji.png" />
                    <meta property="og:url" content="" />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:site_name" content="Funko Store" />
                    <meta name="keywords" content="Funko, collectibles, ecommerce, shopping cart, wishlist, user sessions, user profiles, purchase history, PayPal, admin dashboard, sales data, recent orders, revenue, earnings, product management, user data, super-admin" />
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
