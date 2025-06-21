import Header from '@/components/header/Header'
import { SheetProvider } from '@/provider/sheet-provider';
import { useUser } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import { Outlet } from 'react-router-dom'
const Protected = () => {

    // do something for route

    const { isLoaded } = useUser();








    if (!isLoaded) {
        return <div className='min-h-screen flex items-center justify-center relative'>

            <div className='animate-bounce'>
                <div className='absolute z-20 transform translate-[-50%] top-[50%] left-[50%] text-white'>W</div>
                <Loader2 className='size-9 animate-spin bg-blue-500 text-white rounded-2xl' />
            </div>
        </div>;
    }


    // if (!isSignedIn) {
    //     return <Navigate to={"/login"} />
    // }

    return (
        <div className=''>
            <Header />
            <Outlet />

            <SheetProvider />
        </div>
    )
}

export default Protected
