import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function IndexPage() {
    const { data: session } = useSession();
    const sessionId = session?.sessionId;
    console.log(sessionId);

    const router = useRouter();



    const handleSignIn = async () => {
        const result = await signIn('google');
        if (result) {
            router.push("/dashboard/products");
        }
    }

    return (
        <div>
            {!session ? (
                <button onClick={handleSignIn}>Sign in with Google</button>
            ) : (
                <div>
                    <p>Signed in as {session.user.name}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            )}
        </div>
    );
}


