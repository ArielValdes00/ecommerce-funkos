import { useEffect, useState } from 'react';
import { getAllSales } from '../../../utils/apiPurchase';
import { getSession } from 'next-auth/react';
import SideBar from '@/components/dashboardComponents/SideBar';
import Sales from '@/components/dashboardComponents/Sales';
import Users from '@/components/dashboardComponents/Users';
import NavBar from '@/components/dashboardComponents/NavBar';
import AllProducts from '@/components/dashboardComponents/AllProducts';
import TopCards from '@/components/dashboardComponents/TopCards';
import BarChart from '@/components/dashboardComponents/BarChats';
import RecentOrders from '@/components/dashboardComponents/RecentOrders';
import { getUsers } from '../../../utils/apiUsers';
import { getProducts } from '../../../utils/apiProducts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function IndexPage({ session, initialSalesData, allUsers, initialProducts }) {
    const [selectedSection, setSelectedSection] = useState('');
    const [dailySales, setDailySales] = useState(0);
    const [weeklySales, setWeeklySales] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDailyItemsSold, setTotalDailyItemsSold] = useState(0);
    const [totalWeeklyItemsSold, setTotalWeeklyItemsSold] = useState(0);
    const [dailySalesTotalByDay, setDailySalesTotalByDay] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [salesInfo, setSalesInfo] = useState([]);

    useEffect(() => {
        const getTotalSales = async () => {
            const sales = initialSalesData;
    
            const currentDate = new Date();
            const oneDay = 24 * 60 * 60 * 1000;
            const oneWeek = 7 * oneDay;
    
            const salesMap = {};
    
            let dailySalesTotal = 0;
            let weeklySalesTotal = 0;
            let totalDailyItemsSold = 0;
            let totalWeeklyItemsSold = 0;
    
            let dailySalesTotalByDayCopy = [...dailySalesTotalByDay];
    
            sales?.forEach((user) => {
                user.Carts.forEach((cartItem) => {
                    const saleDate = new Date(cartItem.createdAt);
                    const price = cartItem.product.price;
                    const dayOfWeek = saleDate.getDay();
    
                    if (currentDate - saleDate <= oneWeek) {
                        weeklySalesTotal += price * cartItem.quantity;
                        totalWeeklyItemsSold += cartItem.quantity;
                        dailySalesTotalByDayCopy[dayOfWeek] += price * cartItem.quantity;
    
                        if (currentDate - saleDate <= oneDay) {
                            dailySalesTotal += price * cartItem.quantity;
                            totalDailyItemsSold += cartItem.quantity;
                        }
                    }
    
                    const saleId = cartItem.orderNumber;
    
                    if (!salesMap[saleId]) {
                        salesMap[saleId] = {
                            userName: user.name,
                            totalPrice: price * cartItem.quantity,
                            timeAgo: calculateTimeAgo(saleDate),
                            orderNumber: saleId,
                        };
                    } else {
                        salesMap[saleId].totalPrice += price * cartItem.quantity;
                    }
                });
            });
    
            const totalUsers = sales.length;
    
            setDailySales(dailySalesTotal);
            setWeeklySales(weeklySalesTotal);
            setTotalDailyItemsSold(totalDailyItemsSold);
            setTotalWeeklyItemsSold(totalWeeklyItemsSold);
            setTotalUsers(totalUsers);
            setDailySalesTotalByDay(dailySalesTotalByDayCopy);
    
            const processedSales = Object.values(salesMap);
    
            setSalesInfo(processedSales);
        };
    
        getTotalSales();
    }, []);
    
    const calculateTimeAgo = (saleDate) => {
        const currentDate = new Date();
        const minutesAgo = Math.floor((currentDate - saleDate) / (1000 * 60));
    
        if (minutesAgo < 60) {
            return `${minutesAgo} Minutes ago`;
        } else if (minutesAgo < 1440) {
            const hoursAgo = Math.floor(minutesAgo / 60);
            return `${hoursAgo} ${hoursAgo === 1 ? 'Hour ago' : 'Hours ago'}`;
        } else {
            const daysAgo = Math.floor(minutesAgo / 1440);
            return `${daysAgo} ${daysAgo === 1 ? 'Day ago' : 'Days ago'}`;
        }
    };    

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case '':
                return (
                    <div className='flex flex-col m-2 flex-grow'>
                        <TopCards
                            dailySales={dailySales}
                            weeklySales={weeklySales}
                            totalUsers={totalUsers}
                            totalDailyItemsSold={totalDailyItemsSold}
                            totalWeeklyItemsSold={totalWeeklyItemsSold}
                        />
                        <div className='mt-3 grid md:grid-cols-3 grid-cols-1 gap-4'>
                            <BarChart dailySalesTotalByDay={dailySalesTotalByDay} />
                            <RecentOrders salesInfo={salesInfo} />
                        </div>
                    </div>
                );
            case 'products':
                return <AllProducts initialProducts={initialProducts} session={session} toast={toast}/>;
            case 'sales':
                return <Sales initialSalesData={initialSalesData} />;
            case 'profile':
                return <Profile />;
            case 'users':
                return <Users allUsers={allUsers} toast={toast} session={session}/>;
            default:
                return null;
        }
    };

    return (
        <main className='flex'>
            <SideBar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            <div className='w-full h-full lg:h-screen bg-gray-100 flex flex-col overflow-y-auto ml-[77px]'>
                <NavBar session={session} />
                {renderSelectedSection()}
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
            />
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

    const userRole = session.user.role; 

    if (userRole !== 'admin' && userRole !== 'superAdmin') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    const sales = await getAllSales();
    const allUsers = await getUsers();
    const initialProducts = await getProducts();

    return {
        props: {
            session,
            initialSalesData: sales,
            allUsers,
            initialProducts
        }
    }
}
