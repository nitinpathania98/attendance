import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin/dashboard",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },

  {
    title: "Users",
    path: "/admin/users",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
  },

  {
    title: "Reports",
    path: "/admin/reports",
    icon: <Icon icon="lucide:clipboard-minus" width="24" height="24" />,
  },
];
