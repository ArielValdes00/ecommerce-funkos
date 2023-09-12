import { useState } from 'react';
import { getSession } from 'next-auth/react';
import SideBar from '@/components/dashboardComponents/SideBar';
import Sales from '@/components/dashboardComponents/Sales';
import Users from '@/components/dashboardComponents/Users';
import NavBar from '@/components/dashboardComponents/NavBar';
import AllProducts from '@/components/dashboardComponents/AllProducts';
import TopCards from '@/components/dashboardComponents/TopCards';
import BarChart from '@/components/dashboardComponents/BarChats';
import RecentOrders from '@/components/dashboardComponents/RecentOrders';

export default function IndexPage({ session }) {
    const [selectedSection, setSelectedSection] = useState('');

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case '':
                return (
                    <div className='flex flex-col flex-grow'>
                        <TopCards />
                        <div className='px-4 pb-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                            <BarChart />
                            <RecentOrders />
                        </div>
                    </div>
                );
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
        <main className='flex'>
            <SideBar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            <div className='w-full min-h-screen flex flex-col bg-gray-100 ml-[75px]'>
                <NavBar session={session} />
                {renderSelectedSection()}
            </div>
        </main>
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


