import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const zodSchema = z.object({

    name: z
        .string({ message: "Please enter a valid name." })
        .trim()
        .min(4, { message: "Name must be at least 4 characters." })
        .max(50, { message: "Name must be at most 50 characters." })
        .regex(/^[a-zA-Z\s.'-]+$/, {
            message: "Name must contain only letters, spaces, apostrophes, and hyphens.",
        })
        .refine(name => name === name.trim(), {
            message: "Name must not contain leading or trailing whitespace.",
        }),

    shopifyId: z
        .string({ message: "Please enter a valid Shopify ID." })
        .min(6, { message: "Shopify ID must be at least 6 characters." })
        .max(50, { message: "Shopify ID must be at most 50 characters." })
        .regex(/^[a-zA-Z0-9-]+$/, {
            message: "Shopify ID must contain only alphanumeric characters and hyphens.",
        })


})

type formValues = z.infer<typeof zodSchema>
type Props = {
    id?: string,
    defaultValues?: formValues,
    onSubmit: (values: formValues) => void,
    disable?: boolean
}



const ShopifyForm = ({ defaultValues, onSubmit, disable, id }: Props) => {


    const form = useForm<formValues>({
        resolver: zodResolver(zodSchema),
        defaultValues: defaultValues,
    })


    //---------------- submit ---  

    const handleSubmit = (values: formValues) => {
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
                                    Enter Shopify Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Shopify Name'
                                        disabled={disable}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />


                    <FormField
                        name='shopifyId'
                        control={form.control}
                        render={({ field }) => {
                            return <FormItem className=''>
                                <FormLabel>
                                    Enter Shopify ID
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Shopify Name'
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
                                id ? "Save Changes" : "Add Products"
                            }
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default ShopifyForm
