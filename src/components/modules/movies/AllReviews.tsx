"use client";

import {
  getAllReviewsCollections,
  deleteReview,
  updateReviewStatus,
} from "@/app/(dashboardLayout)/@admin/admin-dashboard/reviewCollections/_action";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function ReviewsTable() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["AllReviewsCollections"],
    queryFn: () => getAllReviewsCollections(),
  });

  // ✅ delete
  const { mutate: deleteMutate, isPending: deleting } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllReviewsCollections"] });
    },
  });

  // ✅ update status
  const { mutate: statusMutate } = useMutation({
    mutationFn: updateReviewStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllReviewsCollections"] });
    },
  });

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure?")) return;
    deleteMutate(id);
  };

  const handleStatusChange = (id: string, status: string) => {
    statusMutate({
      id,
      status: status as "PENDING" | "APPROVED",
    });
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

              {/* Movie */}
              <td className="p-3 font-semibold">
                {item.movie?.movieName}
              </td>

              {/* User */}
              <td className="p-3 text-green-600 font-bold">
                {item.user?.name}
              </td>

              {/* 🔥 STATUS DROPDOWN */}
              <td className="p-3">
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(item.id, e.target.value)
                  }
                  className={`px-2 py-1 rounded text-xs font-semibold border ${
                    item.status === "APPROVED"
                      ? "bg-green-100 text-black"
                      : "bg-yellow-100 text-black"
                  }`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </td>

              {/* Comment */}
              <td className="p-3">
                {item.comment || "No comment"}
              </td>

              {/* DELETE */}
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}