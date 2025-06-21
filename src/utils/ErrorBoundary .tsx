import { useErrorStore } from '@/features/ip/hooks/use-error-ip';
import { ReactNode } from 'react'
export const ErrorBoundary = ({ children }: { children: ReactNode }) => {

    const { isCriticalError } = useErrorStore();
    console.log(isCriticalError)

    if (isCriticalError) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: 'white'
            }} />
        );
    }

    return <>{children}</>;



}