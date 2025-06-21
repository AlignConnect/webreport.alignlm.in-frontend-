import { z } from 'zod';
import { Link, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"



const zodSchema = z.object({
    alias: z.string({ message: "Please Enter Valid Name" }).nonempty({ message: "Name should not be empty" }).min(4, { message: "Name should be at least 4 characters" }),
    url: z.string({ message: "Please Enter Valid URL" }).nonempty({ message: "URL should not be empty" }).url({ message: "Please enter Valid URL" }),
    token: z.string({ message: "Please Enter Valid Token" }).nonempty({ message: "Token should not be empty" }).min(4, { message: "Token should be at least 10 characters" }),

})

type formValues = z.infer<typeof zodSchema>
type Props = {
    id?: string,
    defaultValues?: formValues,
    onSubmit: (values: formValues) => void,
    onDelete?: () => void,
    disable?: boolean,
    deletePermission: boolean
}


const AccountForm = ({ defaultValues, onSubmit, disable, id, onDelete, deletePermission }: Props) => {




    console.log(defaultValues)
    const form = useForm<formValues>({
        resolver: zodResolver(zodSchema),
        defaultValues: defaultValues,
    })




    //---------------- submit ---  

    const handleSubmit = (values: formValues) => {
        onSubmit(values)

    }

    //--- delete =-----

    // const handleDelete = () => {




    // }




    return (
        <div>

            <Form {...form}>

                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className='space-y-4 '
                >

                    <FormField
                        name='alias'
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


                    <FormField
                        name='url'
                        control={form.control}
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel>
                                    Enter URL
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='https:// or http://example.com'
                                        disabled={disable}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />




                    <FormField
                        name='token'
                        control={form.control}
                        render={({ field }) => {
                            return <FormItem >
                                <FormLabel>
                                    Enter Token
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Enter Website Token'
                                        disabled={disable}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />

                    <div className='space-y-3'>

                        <Button className='w-full bg-gradient-to-r from-violet-500 to-blue-500  text-white hover:text-white cursor-pointer  btn-animation ' type='submit' disabled={disable}>

                            <Link />
                            {
                                id ? "Save Changes" : "Create Website"
                            }
                        </Button>

                        {(!!id && deletePermission) && <Button
                            className='w-full cursor-pointer '
                            variant={"outline"}
                            type='button'
                            disabled={disable}
                            onClick={onDelete}
                        >
                            <Trash className='mr-2' size={12} />

                            Delete Websites

                        </Button>}
                    </div>

                </form>

            </Form>


        </div>
    )
}

export default AccountForm
