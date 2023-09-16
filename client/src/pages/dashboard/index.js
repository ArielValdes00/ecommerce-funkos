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

export default function IndexPage({ session, initialSalesData }) {
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
                });
            });

            const totalUsers = sales.length;

            setDailySales(dailySalesTotal);
            setWeeklySales(weeklySalesTotal);
            setTotalDailyItemsSold(totalDailyItemsSold);
            setTotalWeeklyItemsSold(totalWeeklyItemsSold);
            setTotalUsers(totalUsers);
            setDailySalesTotalByDay(dailySalesTotalByDayCopy);

            const processedSales = sales.map((sale) => {
                const carts = sale.Carts;
                if (carts.length === 0) return null;

                const totalPrice = carts.reduce((total, cart) => {
                    const productPrice = parseFloat(cart.product.price);
                    return total + productPrice * cart.quantity;
                }, 0);

                const saleDate = new Date(carts[0].createdAt);
                const minutesAgo = Math.floor((Date.now() - saleDate) / (1000 * 60));

                return {
                    userName: sale.name,
                    totalPrice: totalPrice,
                    minutesAgo: minutesAgo,
                    orderNumber: carts[0].orderNumber,
                };
            }).filter(Boolean);

            setSalesInfo(processedSales);
        };

        getTotalSales();
    }, []);

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case '':
                return (
                    <div className='flex flex-col flex-grow'>
                        <TopCards
                            dailySales={dailySales}
                            weeklySales={weeklySales}
                            totalUsers={totalUsers}
                            totalDailyItemsSold={totalDailyItemsSold}
                            totalWeeklyItemsSold={totalWeeklyItemsSold}
                        />
                        <div className='px-4 pb-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                            <BarChart dailySalesTotalByDay={dailySalesTotalByDay} />
                            <RecentOrders salesInfo={salesInfo} />
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

    const sales = await getAllSales();

    return {
        props: {
            session,
            initialSalesData: sales
        }
    }
}
