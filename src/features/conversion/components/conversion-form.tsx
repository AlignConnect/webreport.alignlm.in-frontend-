import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const zodSchema = z.object({
    websites: z.string({ required_error: "URL is required" }).nonempty({ message: "URL is Not Allow Empty" }).url({ message: "Please Enter a Valid URI" }),
    exo: z.boolean().optional(),
    ts: z.boolean().optional()
})

type formValues = z.infer<typeof zodSchema>
type Props = {
    id?: string,
    defaultValues?: formValues,
    onSubmit: (values: formValues) => void,
    disable?: boolean
}



const Conversionform = ({ defaultValues, onSubmit, disable, id }: Props) => {


    console.log(defaultValues, id)

    const form = useForm<formValues>({
        resolver: zodResolver(zodSchema),
        defaultValues: defaultValues,
    })


    //---------------- submit ---  

    const handleSubmit = (values: formValues) => {

        console.log(values)

        onSubmit(values)

    }





    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className='space-y-4 px-4'
                >
                    <FormField
                        name='websites'
                        control={form.control}
                        render={({ field }) => {
                            return <FormItem className=''>
                                <FormLabel>
                                    Enter Website Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Site Name'
                                        disabled={disable}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />


                    {

                        id && <div className='flex items-center gap-8'>
                            <FormField
                                name='exo'
                                control={form.control}
                                render={({ field: { onChange, value } }) => {
                                    return <FormItem className=''>
                                        <FormLabel className='py-1'>
                                            Exo Click
                                        </FormLabel>
                                        <FormControl>
                                            <Switch checked={value} onCheckedChange={onChange} className='btn-grediant bg-gradient-to-bl data-[state=checked]:from-violet-600 data-[state=checked]:to-pink-600' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            />

                            <FormField
                                name='ts'
                                control={form.control}
                                render={({ field: { onChange, value } }) => {
                                    return <FormItem className=''>
                                        <FormLabel className='py-1'>
                                            Traffic Start
                                        </FormLabel>
                                        <FormControl>
                                            <Switch checked={value} onCheckedChange={onChange} className='btn-grediant bg-gradient-to-bl data-[state=checked]:from-violet-600 data-[state=checked]:to-pink-600' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            />
                        </div>

                    }



                    <div>
                        <Button className='w-full bg-gradient-to-r from-violet-500 to-blue-500  text-white hover:text-white cursor-pointer  btn-animation ' type='submit' disabled={disable}>
                            <Link />
                            {
                                id ? "Save Changes" : "Add Websites"
                            }
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default Conversionform
