"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAllComments, deleteComment } from "@/app/(dashboardLayout)/@user/dashboard/myComments/_action";

const AllComment = () => {
  const queryClient = useQueryClient();

  const [editId, setEditId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [loading, setLoading] = useState(false);


  const { data } = useQuery({
    queryKey: ["comments"],
    queryFn: getAllComments,

  });
console.log(data)
 
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  // ✅ UPDATE (fetch)
  const handleUpdate = async (id: string) => {
    console.log(id,'from update comment')
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/v1/review/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            comment: editComment,
            rating: Number(editRating),
          }),
        }
      );
console.log(res,"fromupdate comment")
      if (!res.ok) {
        throw new Error("Failed to update");
      }

      queryClient.invalidateQueries({ queryKey: ["comments"] });

      setEditId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:max-w-7xl lg:mx-auto mt-10 overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg">

        {/* HEADER */}
        <thead className="bg-amber-300 text-black font-bold text-left">
          <tr>
            <th className="p-3">🎬 Movie</th>
            <th className="p-3">⭐ Rating</th>
            <th className="p-3">💬 Comment</th>
            <th className="p-3">📌 Status</th>
            <th className="p-3">⚙ Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data?.data?.map((item: any) => (
            <tr key={item.id} className="border-t">

              {/* Movie */}
              <td className="p-3 font-semibold">
                {item.movie?.movieName}
              </td>

              {/* Rating */}
              <td className="p-3 text-yellow-500 font-bold">
                ⭐ {item.rating}
              </td>

              {/* Comment */}
              <td className="p-3">
                {editId === item.id ? (
                  <div className="space-y-2">
                    <input
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="border p-1 w-full text-amber-700"
                      placeholder="Update comment"
                    />

                    <input
                      type="number"
                      value={editRating}
                      onChange={(e) =>
                        setEditRating(Number(e.target.value))
                      }
                      className="border p-1 w-full text-amber-700"
                      min={1}
                      max={10}
                    />
                  </div>
                ) : (
                  item.comment
                )}
              </td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs rounded font-semibold ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : item.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              {/* Actions */}
              <td className="p-3 space-x-2">

                {/* DELETE */}
                <button
                  onClick={() => deleteMutation.mutate(item.id)}
                  disabled={deleteMutation.isPending}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>

                {/* EDIT / SAVE */}
                {editId === item.id ? (
                  <button
                    onClick={() => handleUpdate(item.id)}
                    disabled={loading}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditComment(item.comment);
                      setEditRating(item.rating);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                )}

              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default AllComment;





// "use client";

// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { getAllComments, deleteComment } from "@/app/(dashboardLayout)/@user/dashboard/myComments/_action";

// const AllComment = () => {
//   const queryClient = useQueryClient();

//   const [editId, setEditId] = useState<string | null>(null);
//   const [editComment, setEditComment] = useState("");
//   const [editRating, setEditRating] = useState(5);
//   const [loading, setLoading] = useState(false);

//   const { data } = useQuery({
//     queryKey: ["comments"],
//     queryFn: getAllComments,
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id: string) => deleteComment(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["comments"] });
//     },
//   });

//   const handleUpdate = async (id: string) => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         `http://localhost:5000/api/v1/review/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           credentials:"include",
//           body: JSON.stringify({
//             comment: editComment,
//             rating: editRating,
//           }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Update failed");
//       }

//       queryClient.invalidateQueries({ queryKey: ["comments"] });
//       setEditId(null);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-10 px-2 sm:px-4">

//       {/* Table Wrapper */}
//       <div className="overflow-x-auto shadow-md rounded-lg">

//         <table className="min-w-full border border-gray-200 text-sm sm:text-base">

//           {/* Header */}
//           <thead className="bg-amber-300 text-black font-bold">
//             <tr>
//               <th className="p-2 sm:p-3 whitespace-nowrap">Movie</th>
//               <th className="p-2 sm:p-3 whitespace-nowrap">Rating</th>
//               <th className="p-2 sm:p-3 whitespace-nowrap">Comment</th>
//               <th className="p-2 sm:p-3 whitespace-nowrap">Status</th>
//               <th className="p-2 sm:p-3 whitespace-nowrap">Actions</th>
//             </tr>
//           </thead>

//           {/* Body */}
//           <tbody>
//             {data?.data?.map((item: any) => (
//               <tr key={item.id} className="border-t">

//                 {/* Movie */}
//                 <td className="p-2 sm:p-3 font-semibold whitespace-nowrap">
//                   {item.movie?.movieName}
//                 </td>

//                 {/* Rating */}
//                 <td className="p-2 sm:p-3 text-yellow-500 font-bold whitespace-nowrap">
//                   ⭐ {item.rating}
//                 </td>

//                 {/* Comment */}
//                 <td className="p-2 sm:p-3 max-w-[150px] sm:max-w-xs break-words">
//                   {editId === item.id ? (
//                     <div className="space-y-2">
//                       <input
//                         value={editComment}
//                         onChange={(e) => setEditComment(e.target.value)}
//                         className="border p-1 w-full text-black"
//                       />

//                       <input
//                         type="number"
//                         value={editRating}
//                         onChange={(e) =>
//                           setEditRating(Number(e.target.value))
//                         }
//                         className="border p-1 w-full text-black"
//                         min={1}
//                         max={10}
//                       />
//                     </div>
//                   ) : (
//                     item.comment
//                   )}
//                 </td>

//                 {/* Status */}
//                 <td className="p-2 sm:p-3 whitespace-nowrap">
//                   <span
//                     className={`px-2 py-1 text-xs rounded font-semibold ${
//                       item.status === "approved"
//                         ? "bg-green-100 text-green-600"
//                         : item.status === "pending"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>

//                 {/* Actions */}
//                 <td className="p-2 sm:p-3 space-x-1 sm:space-x-2 whitespace-nowrap">

//                   {/* Delete */}
//                   <button
//                     onClick={() => deleteMutation.mutate(item.id)}
//                     className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
//                   >
//                     Delete
//                   </button>

//                   {/* Edit / Save */}
//                   {editId === item.id ? (
//                     <button
//                       onClick={() => handleUpdate(item.id)}
//                       disabled={loading}
//                       className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
//                     >
//                       {loading ? "Saving..." : "Save"}
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         setEditId(item.id);
//                         setEditComment(item.comment);
//                         setEditRating(item.rating);
//                       }}
//                       className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
//                     >
//                       Edit
//                     </button>
//                   )}

//                 </td>

//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllComment;