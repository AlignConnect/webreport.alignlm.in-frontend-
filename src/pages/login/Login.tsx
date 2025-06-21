import { SignIn } from '@clerk/clerk-react'
const Login = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <SignIn />
        </div>
    )
}

export default Login
