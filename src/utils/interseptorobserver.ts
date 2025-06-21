import { useEffect, useRef, useState } from 'react';


export const useIntersectionObserver = (options?: IntersectionObserverInit) => {

    const ref = useRef(null);
    const [isIntersecting, setIntersecting] = useState(false);


    useEffect(() => {


        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        }, options)


        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()

    }, [options])

    return { ref, isIntersecting };


}