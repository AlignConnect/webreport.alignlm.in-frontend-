import { JSX, useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from "@/components/ui/button";

export const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<unknown>] => {

    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)


    const confirm = () => new Promise((resolve, _) => {
        setPromise({ resolve })
    })


    const handleClose = () => {
        setPromise(null)
    }


    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose()
    }



    const ConfirmDialog = () => (

        <Dialog open={promise !== null} onOpenChange={handleCancel}>

            <DialogContent >

                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="pt-2">

                    <Button
                        variant={"outline"}
                        onClick={handleCancel}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>



                    <Button
                        variant={"outline"}
                        onClick={handleConfirm}
                        className="cursor-pointer btn-animation bg-gradient-to-bl from-blue-600 to-violet-600 text-white hover:text-white"
                    >
                        Confirm
                    </Button>

                </DialogFooter>


            </DialogContent>

        </Dialog>

    )



    return [ConfirmDialog, confirm]

}