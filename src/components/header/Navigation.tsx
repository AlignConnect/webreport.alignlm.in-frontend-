import { navbar } from "@/routes/navbar";
import NavButton from "./NavButton";
import { useLocation } from "react-router";
import { usePermissionQuery } from "@/utils/IPChecker";
type NavigationProps = {
  onLinkClick?: () => void;
};
const Navigation = ({ onLinkClick }: NavigationProps) => {
  const { pathname } = useLocation();
  const { data } = usePermissionQuery();
  const dyData = [...(data || []), "DASHBOARD"];

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 text-black lg:text-white">
      {navbar.map(
        (item, index) =>
          dyData?.includes(item?.permission) && (
            <NavButton
              key={index}
              href={item.href}
              label={item.label}
              isActive={pathname === item.href}
              onClick={onLinkClick}
            />
          )
      )}
    </div>
  );
};

export default Navigation;
