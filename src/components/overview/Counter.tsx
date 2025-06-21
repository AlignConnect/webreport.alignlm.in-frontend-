import { CountUp } from '@/utils/react-countup'

const Counter = ({ count }: { count: number }) => {

    return (
        <div className='px-1'>
            (<CountUp
                preserveValue
                start={0}
                end={count}

            />)
        </div>
    )
}

export default Counter
