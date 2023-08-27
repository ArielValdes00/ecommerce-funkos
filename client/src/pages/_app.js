import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { ProductProvider } from '../context/ProductContext.js';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <ProductProvider>
            <SessionProvider>
            <Head>
                <title>Funko Store</title>
                <link rel="icon" href="/logo-title.png" />
                <meta name="description" content="Welcome to my Full Stack Developer portfolio. I am Ariel Valdés, a passionate Full Stack Developer with expertise in building web applications. Here you can explore some of my projects and works, showcasing my skills in front-end and back-end development, as well as database management. Feel free to browse around and get in touch if you're interested in collaborating on exciting projects!" />
                <meta property="og:title" content="Full Stack Developer Portfolio - Ariel Valdés" />
                <meta property="og:description" content="Welcome to my Full Stack Developer portfolio. I am Ariel Valdés, a passionate Full Stack Developer with expertise in building web applications. Here you can explore some of my projects and works, showcasing my skills in front-end and back-end development, as well as database management. Feel free to browse around and get in touch if you're interested in collaborating on exciting projects!" />
                <meta property="og:image" content="https://res.cloudinary.com/dnczjmsbt/image/upload/v1691437299/bg-portfolio_f0unhu.png" />
                <meta property="og:url" content="https://portfolio-ochre-six-55.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Full Stack Developer Portfolio - Ariel Valdés" />
                <meta name="keywords" content="full stack developer, web development, front-end, back-end, database management, projects, works, react, next.js, tailwind, javascript" />
                <meta name="author" content="Ariel Valdés" />
            </Head>
                <Component {...pageProps} />
            </SessionProvider>
        </ProductProvider>
    );
}

export default MyApp;
