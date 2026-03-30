"use client"

import { getAllComments } from '@/app/(dashboardLayout)/@user/dashboard/myComments/_action';
import { useQuery } from '@tanstack/react-query';
// import ReviewTable from './CommentTable';
export type Review = {
  id: string;
  rating: number;
  comment: string;
  status: string;
  movie: {
    movieName: string;
  };
};

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   data: Review[];
// };

const AllComment = () => {
    const { data  } = useQuery({
       queryKey: ["comments"],
       queryFn: () => getAllComments(),
     });

      console.log(data,"all comment client");
  return (
    <div>
       <div className="max-w-6xl mx-auto mt-10 overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

        {/* Header */}
        <thead className="bg-amber-300 text-black font-bold text-left">
          <tr>
            <th className="p-3">🎬 Movie</th>
            <th className="p-3">⭐ Rating</th>
            <th className="p-3">💬 Comment</th>
            <th className="p-3">📌 Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data?.data?.map((item) => (
            <tr key={item?.id} className="border-t hover:bg-amber-600 hover:text-green-800">

              {/* Movie Name */}
              <td className="p-3 font-semibold">
                {item.movie?.movieName}
              </td>

              {/* Rating */}
              <td className="p-3 text-yellow-500 font-bold">
                ⭐ {item.rating}
              </td>

              {/* Comment */}
              <td className="p-3 text-white">
                {item.comment}
              </td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === "APPROVED"
                      ? "bg-green-100 text-green-600"
                      : item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
    </div>
  )
}

export default AllComment
