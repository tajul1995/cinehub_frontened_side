"use client";

import { getAllReviewsCollections, deleteReview } from "@/app/(dashboardLayout)/@admin/admin-dashboard/reviewCollections/_action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ReviewsTable() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["AllReviewsCollections"],
    queryFn: () => getAllReviewsCollections(),
  });

  // 🔥 delete mutation
  const { mutate, isPending } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      // 🔄 refetch after delete
      queryClient.invalidateQueries({ queryKey: ["AllReviewsCollections"] });
    },
  });

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    mutate(id);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

        {/* Header */}
        <thead className="bg-amber-400 text-black font-bold text-left">
          <tr>
            <th className="p-3">🎬 Movie</th>
            <th className="p-3">👤 User</th>
            <th className="p-3">📌 Status</th>
            <th className="p-3">💬 Comment</th>
            <th className="p-3 text-center">⚙️ Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data?.data?.map((item) => (
            <tr key={item.id} className="border-t ">

              <td className="p-3 font-semibold">
                {item.movie?.movieName}
              </td>

              <td className="p-3 text-green-600 font-bold">
                {item.user?.name}
              </td>

              <td className="p-3">
                <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-600">
                  {item.status}
                </span>
              </td>

              <td className="p-3">
                {item.comment || "No comment"}
              </td>

              {/* 🔥 DELETE BUTTON */}
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isPending}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}