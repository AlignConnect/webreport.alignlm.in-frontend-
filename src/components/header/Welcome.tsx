import { useUser } from '@clerk/clerk-react'

const Welcome = () => {

    const { isLoaded, user } = useUser();

    return (
        <div className='space-y-4 mb-4'>
            <h2 className='text-2xl sm:text-4xl text-white font-medium'>
                Welcome Back {isLoaded ? "," : ""} {user?.firstName}
            </h2>

            <p className='text-base text-[#89b6fd]'>
                This is your Overview Report
            </p>
        </div>
    )
}

export default Welcome
