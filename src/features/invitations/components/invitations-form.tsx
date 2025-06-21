import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const zodSchema = z.object({
    email_address: z
        .string({ required_error: "Email is required" })
        .nonempty({ message: "Email is Not Allow Empty" })
        .email({ message: "Please Enter a Valid Email" }),/*  */

})

type formValues = z.infer<typeof zodSchema>
type Props = {
    defaultValues?: formValues,
    onSubmit: (values: formValues) => void,
    disable?: boolean
}



const Invitationsform = ({ defaultValues, onSubmit, disable }: Props) => {





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
                        name='email_address'
                        control={form.control}
                        render={({ field }) => {
                            return <FormItem className=''>
                                <FormLabel>
                                    Enter Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='email'
                                        placeholder='Email Name'
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
                            Invite
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default Invitationsform
