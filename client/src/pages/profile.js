import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const profile = ({ session }) => {
    const { data: status } = useSession();
    const router = useRouter();
    const user = session.user
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Navbar session={session} />
            <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
                <p>{user.areaCode}</p>
            </div>
        </div>
    )
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

export default profile
