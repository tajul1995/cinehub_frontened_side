import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Admin Profile",
        url: "/admin-dashboard/adminProfile",
      },
      {
        title: "Review Collections",
        url: "/admin-dashboard/reviewCollections",
      },
      {
        title:"Total Earning",
        url: "/admin-dashboard/totalEarning"
      },
      {
        title:"Back Home",
        url: "/"
      }
    ],
  },
];