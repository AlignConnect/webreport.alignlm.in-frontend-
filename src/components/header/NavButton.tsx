import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

const NavButton = ({ href, isActive, label, onClick }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full lg:w-auto justify-between font-normal border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none transition",
        isActive ? "bg-white/10" : "bg-transparent",
        "hover:bg-white/20 hover:text-white text-black lg:text-white"
      )}
    >
      <Link
        to={href}
        onClick={onClick}
        className={cn(
          "text-sm font-medium",
          isActive ? "text-blue-600 lg:text-white" : "text-black lg:text-white"
        )}
      >
        {label}
      </Link>
    </Button>
  );
};

export default NavButton;
