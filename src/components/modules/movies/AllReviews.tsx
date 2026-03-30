"use client";

import { getAllReviewsCollections } from "@/app/(dashboardLayout)/@admin/admin-dashboard/reviewCollections/_action";
import { useQuery } from "@tanstack/react-query";

export type ICommentsCollection ={
  id: string;
  comment: string;
  status: string;
  movie: {
    movieName: string;
    
  };
  user:{
    name:string;
  }
};
// type ApiResponse = {
//   success: boolean;
//   message: string;
//   data: Review[];
// };

export default function ReviewsTable() {
    const { data  } = useQuery({
       queryKey: ["AllReviewsCollections"],
       queryFn: () => getAllReviewsCollections(),
     });

  return (
    <div className="max-w-6xl mx-auto mt-10 overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

        {/* Header */}
        <thead className="bg-amber-400 text-black font-bold text-left">
          <tr>
            <th className="p-3">🎬 Movie</th>
            <th className="p-3">💰 user Name</th>
            <th className="p-3">📌 status</th>
            <th className="p-3">💳 comment</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data?.data?.map((item) => (
            <tr key={item.id} className="border-t ">

              {/* Movie Name */}
              <td className="p-3 font-semibold">
                {item.movie?.movieName}
              </td>

              {/* Price */}
              <td className="p-3 text-green-600 font-bold">
                {item.user?.name}
              </td>
              {/* <td className="p-3 text-green-600 font-bold">
                ${item.user?.name}
              </td> */}

              {/* Booking Status */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === "COMPLETED"
                      ? "bg-green-100 text-green-600"
                      : item.status === "SCHEDULED"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              {/* Payment Status */}
                <td className="p-3">
                {/* <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.booking?.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-600"
                      : item.booking?.paymentStatus === "UNPAID"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.booking?.paymentStatus}
                </span> */}
                   {item.comment?item.comment:"No comment"}
              </td>  

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}