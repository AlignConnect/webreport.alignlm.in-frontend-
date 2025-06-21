import {
  Accessibility,
  ShieldEllipsis,
  UserRoundPlus,
  Users,
} from "lucide-react";

export const navbar = [
  {
    href: "/",
    label: "Dashboard",
    permission: "DASHBOARD",
  },
  // {
  //     href: "/over-view",
  //     label: "Overview",
  //     permission: "OVERVIEW"
  // },
  {
    href: "/websites",
    label: "Websites",
    permission: "WEBSITES",
  },
  {
    href: "/cloudeflair",
    label: "Cloude - Image",
    permission: "CLOUDE_IMAGE",
  },
  {
    href: "/cache",
    label: "Cloude - Cache",
    permission: "CLOUDE_CACHE",
  },
  {
    href: "/shopify",
    label: "Shopify",
    permission: "SHOPIFY",
  },

  {
    href: "/ar-report",
    label: "Order Report",
    permission: "AR-REPORT",
  },
  // {
  //     href: "/bitly",
  //     label: "Bitly",
  //     permission: "BITLY_LINKS"
  // },

  {
    href: "/conversion",
    label: "Exo/ts",
    permission: "EXO_TS",
  },
  // {
  //     href: "/links",
  //     label: "Links",
  //     permission: "LINKS"

  // },
  {
    href: "/settings/users",
    label: "Settings",
    permission: "SETTINGS",
  },
];

export const settingNavbar = [
  {
    href: "users",
    path: "/settings/users",
    label: "Users",
    icon: <Users className="size-5" />,
  },
  {
    href: "invitations",
    path: "/settings/invitations",
    label: "invitations",
    icon: <UserRoundPlus className="size-5" />,
  },
  {
    href: "permissions",
    path: "/settings/permissions",
    label: "Permissions",
    icon: <Accessibility className="size-5" />,
  },
  {
    href: "ip",
    path: "/settings/ip",
    label: "IP - Security",
    icon: <ShieldEllipsis className="size-5" />,
  },
];
