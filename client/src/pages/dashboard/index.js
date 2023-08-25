import { useState } from 'react';
import { getSession } from 'next-auth/react';
import SideBar from '@/dashboardComponents/SideBar';
import Products from '@/dashboardComponents/Products';
import Sales from '@/dashboardComponents/Sales';
import Users from '@/dashboardComponents/Users';
import NavBar from '@/dashboardComponents/NavBar';

export default function IndexPage({ session }) {
    const [selectedSection, setSelectedSection] = useState('products');

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case 'products':
                return <Products />;
            case 'sales':
                return <Sales />;
            case 'profile':
                return <Profile />;
            case 'users':
                return <Users />;
            default:
                return null;
        }
    };
    return (
        <div>
            <SideBar setSelectedSection={setSelectedSection} selectedSection={selectedSection} />
            <div className='absolute left-48'>
                <NavBar section={selectedSection} session={session}/>
                {renderSelectedSection()}
            </div>
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    return {
        props: {
            session
        }
    }
}


