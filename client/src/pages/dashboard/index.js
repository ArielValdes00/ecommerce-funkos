import { useState } from 'react';
import { getSession } from 'next-auth/react';
import SideBar from '@/components/dashboardComponents/SideBar';
import Sales from '@/components/dashboardComponents/Sales';
import Users from '@/components/dashboardComponents/Users';
import NavBar from '@/components/dashboardComponents/NavBar';
import AllProducts from '@/components/dashboardComponents/AllProducts';

export default function IndexPage({ session }) {
    const [selectedSection, setSelectedSection] = useState('products');

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case 'products':
                return <AllProducts />;
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
                <NavBar section={selectedSection} session={session} />
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


