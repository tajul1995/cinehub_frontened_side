"use client";

import { getAllPayments } from "@/app/(dashboardLayout)/@user/dashboard/paymentHistory/_action";
import { useQuery } from "@tanstack/react-query";

// type Review = {
//   id: string;
//   movie: {
//     movieName: string;
//     price: number;
//   };
//   booking: {
//     status: string;
//     paymentStatus: string;
//   };
// };

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   data: Review[];
// };

export default function BookingTable() {
    const { data  } = useQuery({
       queryKey: ["payments"],
       queryFn: () => getAllPayments(),
     });
  return (
    <div className="max-w-6xl mx-auto mt-10 overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

        {/* Header */}
        <thead className="bg-amber-300 text-black font-bold text-left">
          <tr>
            <th className="p-3">🎬 Movie</th>
            <th className="p-3">💰 Price</th>
            <th className="p-3">📌 Booking Status</th>
            <th className="p-3">💳 Payment Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data?.data?.map((item) => (
            <tr key={item.id} className="border-t hover:bg-amber-200 hover:text-green-950">

              {/* Movie Name */}
              <td className="p-3 font-semibold">
                {item.movie?.movieName}
              </td>

              {/* Price */}
              <td className="p-3 text-green-600 font-bold">
                ${item.movie?.price}
              </td>

              {/* Booking Status */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.booking?.status === "COMPLETED"
                      ? "bg-green-100 text-green-600"
                      : item.booking?.status === "SCHEDULED"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.booking?.status}
                </span>
              </td>

              {/* Payment Status */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.booking?.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-600"
                      : item.booking?.paymentStatus === "UNPAID"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.booking?.paymentStatus}
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}