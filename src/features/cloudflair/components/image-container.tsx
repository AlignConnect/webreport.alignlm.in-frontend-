import { useEffect } from 'react'
import { useGetCloudflairImage } from '@/features/cloudflair/api/use-get-cloudflair-image'
import { Skeleton } from '@/components/ui/skeleton'
import { useIntersectionObserver } from '@/utils/interseptorobserver';
import { Button } from '@/components/ui/button';
import { Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import useDeleteCloudeFlairImage from '../hooks/use-delete-hook';
import { CardContent } from '@/components/ui/card';
import { useImageStyle } from '../hooks/use-image-style-hook';
import MasoneryLayout from './masonary-layout';
import ListLayout from './list-layout';


const ImageContainer = () => {

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetCloudflairImage()

    const { onDeleteImage, DeleteCloudeFlairArray } = useDeleteCloudeFlairImage();

    const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.1 })

    const { imageStyle } = useImageStyle();

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage();
        }
    }, [isIntersecting, ref]);



    const handleCopyClick = (imageUrl: string) => {
        navigator.clipboard?.writeText(imageUrl)
        toast("Copied Image !!", {
            description: imageUrl,
            richColors: true,
            style: {
                color: "black"
            },
            icon: <Copy className='size-4' />
        });
    };


    const handleDelete = (id: string) => {
        onDeleteImage(id)
    }



    if (isLoading) {
        return <div className='grid grid-cols-10 mx-auto  gap-5 space-1 w-full px-2 '>
            {
                Array.from({ length: 40 }).map(() => {
                    return <Skeleton className='grow h-[150px] object-cover animate-pulse border bg-gray-300' />
                })
            }
        </div>
    }

    const masonery = data?.flatMap((e, _) => e?.result?.images) ?? [];

    return (
        <div className='' >

            <CardContent>

                {imageStyle
                    ? <MasoneryLayout
                        DeleteCloudeFlairArray={DeleteCloudeFlairArray}
                        handleCopyClick={handleCopyClick}
                        handleDelete={handleDelete}
                        masonery={masonery}

                    /> :
                    <ListLayout
                        DeleteCloudeFlairArray={DeleteCloudeFlairArray}
                        handleCopyClick={handleCopyClick}
                        handleDelete={handleDelete}
                        images={masonery}
                    />


                }

            </CardContent>

            <div ref={ref} className="w-full text-center my-4">
                <Button variant={"ghost"} disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
                    {isFetchingNextPage ? <Loader2 className='size-10 animate-spin text-blue-800' /> : hasNextPage ? <div className='bg-blue-500 px-5 py-2 rounded-lg text-white '>Load More</div> : "Web Brahmikalp"}
                </Button>
            </div>
        </div>



    )
}

export default ImageContainer
