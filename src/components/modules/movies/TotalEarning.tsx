"use client";

import { totalEarning } from "@/app/(dashboardLayout)/@admin/admin-dashboard/totalEarning/_action";
import { useQuery } from "@tanstack/react-query";
// import { totalEarning } from "@/app/(dashboardLayout)/@admin/admin-dashboard/earning/_action";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardChart() {
  const { data } = useQuery({
    queryKey: ["TotalEarning"],
    queryFn: () => totalEarning(),
  });

  const chartData = [
    {
      name: "Revenue",
      value: data?.data?.totalRevenue || 0,
    },
    {
      name: "Movies",
      value: data?.data?.totalMoviesBooked || 0,
    },
  ];

  return (
    <div className="w-full h-[300px] bg-yellow-500 p-4 rounded-xl shadow">
      <h2 className="text-center text-xl text-black font-bold">total earning tk:    {data?.data?.totalRevenue} from {data?.data?.totalMoviesBooked} moivies</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" className="text-black text-xl font-bold" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}