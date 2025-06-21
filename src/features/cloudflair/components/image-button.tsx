import { Button } from "@/components/ui/button"

type btnProps = {

    clickEvent: () => void
    icon: React.ReactNode,
    label?: string
}

export const ImageButton = ({ clickEvent, icon, label }: btnProps) => {

    return <Button
        variant={"outline"}
        className="cursor-pointer text-white btn-animation bg-gradient-to-r from-violet-500 hover:text-white to-blue-500"
        onClick={clickEvent}>
        {icon} {label}
    </Button>

}