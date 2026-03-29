import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "User Profile",
        url: "/dashboard/userProfile",
      },
      {
        title: "My Comments",
        url: "/dashboard/myComments",
      },
      {
        title:"Payment History",
        url: "/dashboard/paymentHistory"
      },
      {
        title:"Back Home",
        url: "/"
      }
    ],
  },
];