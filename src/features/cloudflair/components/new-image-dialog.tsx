import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCreateCloudeImage as useCreateCloudeImageHook } from '../hooks/use-create-cloude-image-hook'
import { Button } from '@/components/ui/button';
import { useCreateCloudeImage } from '@/features/cloudflair/api/use-create-cloudeflair-image'
import { Loader2 } from 'lucide-react';


const NewImageDialog = () => {

    const { isOpen, onClose } = useCreateCloudeImageHook();

    const createCloudeImage = useCreateCloudeImage();
    // drop zone

    const [images, setImages] = useState<File[]>([]);


    const onDrop = useCallback((acceptedFiles: File[]) => {
        setImages((prev) => [...prev, ...acceptedFiles])
    }, [])


    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/*': []
        },
        multiple: true
    })


    const handleUploadAllImages = () => {

        createCloudeImage.mutate(images, {
            onSuccess: () => {
                setImages([])
                onClose()
            }
        })


    }

    return (
        <div>

            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className='bg-gray-200'>
                    <DialogHeader>
                        <DialogTitle>Upload Images</DialogTitle>
                        <DialogDescription>
                            Upload new images here
                        </DialogDescription>
                    </DialogHeader>


                    {/* // drop zone */}


                    <div
                        {...getRootProps()}
                        className={`py-20  border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                            }`}
                    >

                        <input {...getInputProps()} />

                        <p className="text-center text-gray-500">
                            {isDragActive ? 'Drop the files here...' : 'Drag and drop images here or click to select files'}
                        </p>

                    </div>




                    {images.length > 0 && (
                        <div>
                            <div className="grid grid-cols-3 gap-4 mt-6 w-full p-1">
                                {images.map((file, index) => (
                                    <div key={index} className="relative group p-1">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-full h-32 object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute cursor-pointer top-1 right-1 text-white bg-black/60 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}

                            </div>

                            <div className='mt-5'>
                                <Button

                                    className='btn-animation hover:text-white bg-linear-to-bl from-violet-700   text-white to-fuchsia-500  w-full py-5'
                                    variant={"ghost"}
                                    onClick={handleUploadAllImages}
                                >
                                    {createCloudeImage.isPending ? <Loader2 className='animate-spin size-6' /> : "Upload All Images"}
                                </Button>
                            </div>

                        </div>
                    )}












                </DialogContent>
            </Dialog>


        </div>
    )
}

export default NewImageDialog
