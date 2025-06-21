import { useValidTicket } from '@/features/auth/api/use-ticket';
import Loader from '@/utils/Loader';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react'
import { useSearchParams } from 'react-router-dom';
const SignUp = () => {


    let [searchParams] = useSearchParams();


    const ticket = searchParams.get("__clerk_ticket");


    const { data, isLoading, isSuccess } = useValidTicket(ticket ?? "");


    if (isLoading) {
        return <Loader />
    }


    if (!data?.valid) {
        return
    }


    return (
        <div className='min-h-screen flex justify-center items-center'>

            {
                isSuccess && <ClerkSignUp />
            }

        </div>
    )
}

export default SignUp
