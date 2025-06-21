import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const ViewProduct = ({ data }: { data: Record<string, any>[] }) => {

    console.log(data)

    return (

        <Popover>
            <PopoverTrigger>
                <Button className='flex justify-center items-center cursor-pointer' variant={"outline"}>
                    View Products
                </Button>
            </PopoverTrigger>


            <PopoverContent className="max-w-[250px]">
                {/* <Separator /> */}

                {
                    data?.length > 0 ? data.map((e, key) => {
                        return <div key={key} className="flex items-center space-x-2 text-[14px] my-3">
                            <div className="min-w-[170px]">{e?.product}</div>
                            <div>{e?.count}</div>
                        </div>
                    }) : <div className="text-[14px]">Product not found</div>
                }


            </PopoverContent>
        </Popover>
    )
}

export default ViewProduct
