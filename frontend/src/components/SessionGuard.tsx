import { useEffect } from 'react';
import { Navigate } from '@tanstack/react-router';
import { useSessionStore } from '@/lib/sessionStore';
import { LoaderCircle } from 'lucide-react';

interface Props {
    children: React.ReactNode;
}

export const SessionGuard = ({ children }: Props) => {
    const { fetchSession, isLoading, isAuthenticated } = useSessionStore();

    useEffect(() => {
        fetchSession();
    }, []);

    if (isLoading) return (<>
        <div className="flex items-center justify-center h-screen">
            <LoaderCircle className=' text-2xl animate-spin' />
            <h2 className='text-lg'>Loading Session data</h2>
        </div>


    </>);

    if (!isAuthenticated()) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};
