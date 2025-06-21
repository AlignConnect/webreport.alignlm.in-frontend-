import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const zodSchema = z.object({
    name: z.string({ message: "Please enter name" })
        .min(2, { message: "Name must be at least 2 characters" })
        .max(50, { message: "Name must be under 50 characters" })
        .regex(/^[A-Za-z ]+$/, {
            message: "Name can only contain letters and spaces"
        }),
    ip_address: z
        .string({ message: "Ip Address is Required !!" })
        .ip({ message: "Please enter a valid ip address", version: "v4" })
})


type formValues = z.infer<typeof zodSchema>
type Props = {
    defaultValues?: formValues,
    onSubmit: (values: formValues) => void,
    disable?: boolean,
    id?: string
}



const Ipform = ({ defaultValues, onSubmit, disable, id }: Props) => {





    const form = useForm<formValues>({
        resolver: zodResolver(zodSchema),
        defaultValues: defaultValues,
    })


    //---------------- submit ---  

    const handleSubmit = (values: formValues) => {

        // console.log(values)

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
                        name='name'
                        control={form.control}
                        render={({ field }) => {
                            return <FormItem className=''>
                                <FormLabel>
                                    Enter Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Enter Name'
                                        disabled={disable}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />


                    <FormField
                        name='ip_address'
                        control={form.control}
                        render={({ field }) => {
                            return <FormItem className=''>
                                <FormLabel>
                                    Enter IP
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Enter IP'
                                        disabled={disable}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />






                    <div>
                        <Button className='w-full bg-gradient-to-r from-violet-500 to-blue-500  text-white hover:text-white cursor-pointer  btn-animation ' type='submit' disabled={disable}>
                            <Link />
                            {
                                id ? "Save Changes" : "Add IP"
                            }
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default Ipform
