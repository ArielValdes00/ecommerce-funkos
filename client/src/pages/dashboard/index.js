import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function IndexPage() {
    const { data: session, status } = useSession();

    const router = useRouter();

    if(status !== 'loading' && status === 'authenticated'){
        router.push('dashboard/products')
    }

    return (
        <div>
            <button onClick={() => signIn()}>Sign in with Google</button>
        </div>
    );
}


