import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Loader2, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useGetCloudflairImageById } from '../api/use-get-cloudflair-byid-image'
import { toast } from 'sonner'
import { useSearchImage } from '../hooks/use-search-image-hook'
import { useDeleteCloudeImage } from '../api/use-delete-cloudeflair-image'

const SearchImageDialog = () => {


    const searchMutationQuery = useGetCloudflairImageById();
    const deleteImageMutation = useDeleteCloudeImage();

    const [imageUri, setImageUri] = useState<string | undefined>(undefined)


    const { isOpen, onclose } = useSearchImage();


    const CloudeUrl = searchMutationQuery.data?.result?.variants[0] ?? "";


    const handleSearchButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const imgId = imageUri?.split("/public")[0].split("aacnHGAqlUDhaplA3bnkbA/")[1]
        if (!imgId) {
            return toast.error("Please Enter Image URI")
        }
        searchMutationQuery.mutate(imgId)
    }


    const handleClose = () => {
        setImageUri("")
        searchMutationQuery.reset()
        onclose()
    }


    const handleDeleteImage = () => {

        const CloudeUrlId = CloudeUrl?.split("/public")[0].split("aacnHGAqlUDhaplA3bnkbA/")[1]

        deleteImageMutation.mutate([CloudeUrlId], {
            onSuccess: () => {
                handleClose()
            }
        })

    }



    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>Search Image</DialogHeader>
                <DialogDescription>you can also  view and delete image</DialogDescription>


                <form className='flex w-full max-w-[600px]' onSubmit={handleSearchButton}>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            placeholder='Search'
                            className='w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-0'
                            value={imageUri}
                            onChange={(e) => setImageUri(e.target.value)} />

                    </div>
                    <Button
                        type='submit'
                        className='!px-4 py-5  btn-animation bg-gradient-to-r from-violet-500 hover:text-white to-blue-500 border border-l-0 rounded-r-full cursor-pointer'
                        variant={"ghost"}>

                        {
                            searchMutationQuery.isPending ? <Loader2 className='animate-spin text-white' /> : <Search className='size-4' />
                        }

                    </Button>
                </form>



                {/* todo image content */}


                <div>

                    {
                        CloudeUrl && <div className='relative group'>

                            <div
                                className='absolute right-15 transition-all -top-3 z-20 btn-animation bg-gradient-to-r from-violet-500 hover:text-white to-blue-500 rounded-3xl p-3 group-hover:top-3 group-hover:visible invisible cursor-pointer'
                                onClick={handleDeleteImage}>
                                {
                                    deleteImageMutation.isPending ? <Loader2 className='animate-spin text-white' /> : <Trash2 className='size-5 text-white' />
                                }
                            </div>
                            <Avatar className='h-[320px] w-[320px] mx-auto rounded-md'>
                                <AvatarImage src={CloudeUrl} className='rounded-none object-contain h-full w-full' />
                                <AvatarFallback className='rounded-none'>AR</AvatarFallback>
                            </Avatar>
                        </div>
                    }

                </div>




            </DialogContent>
        </Dialog>
    )
}

export default SearchImageDialog
