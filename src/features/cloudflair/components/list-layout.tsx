import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy, Trash2 } from "lucide-react"

type list = {
    handleDelete: (id: string) => void,
    handleCopyClick: (variant: string) => void,
    images: any[],
    DeleteCloudeFlairArray: string[]
}

const ListLayout = ({ DeleteCloudeFlairArray, handleCopyClick, handleDelete, images }: list) => {

    console.log(DeleteCloudeFlairArray)

    return (
        <div className="w-full grid grid-cols-3  gap-6 p-4">
            {images.map((item, key) => (
                <div
                    key={key}
                    className={cn("border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white p-5 grid grid-cols-3 items-center gap-5 relative ",
                    )}
                >

                    <Avatar className={cn("w-full h-full object-contain rounded-xl overflow-hidden col-span-1",
                        DeleteCloudeFlairArray.includes(item.id) && "blur-[5px] before:bg-white/20 before:z-40"
                    )} >
                        <AvatarImage
                            src={item?.variants[0]}
                            alt={`Image ${key}`}
                            className="max-w-full w-auto h-full object-contain"
                        />
                        <AvatarFallback className="text-sm text-gray-500">Image</AvatarFallback>
                    </Avatar>
                    <div className={cn("mt-3 text-center col-span-2 w-ful space-y-3", DeleteCloudeFlairArray.includes(item.id) && "blur-[5px] before:bg-white/20 before:z-40")}>
                        <div title={item?.variants[0]} className="break-words">
                            {item?.variants[0]}
                        </div>
                    </div>

                    <div className="space-x-5 absolute transform translate-[50%] left-1/2 top-2/3">
                        <Button
                            variant={"outline"}
                            className="border-0"
                            onClick={() => handleCopyClick(item?.variants[0])}
                        >
                            <Copy />
                        </Button>

                        <Button
                            variant={"outline"}
                            className="border-0 absolute z-30"
                            onClick={() => handleDelete(item?.id)}

                        >
                            <Trash2 />
                        </Button>


                    </div>

                </div>
            ))
            }
        </div >

    )
}

export default ListLayout


