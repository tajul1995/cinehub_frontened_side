/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

// ✅ Types
type Booking = {
  id: string;
  movieId: string;
};

type Movie = {
  id: string;
  movieName: string;
  bookings: Booking[];
};

export default function ReviewSection({ movie }: { movie: Movie }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const booking = movie?.bookings?.[0];

  const handleSubmitReview = async () => {
    // ✅ Validation
    if (!booking) {
      return alert("❌ You must book this movie before reviewing.");
    }

    if (!comment.trim()) {
      return alert("❌ Please write a comment.");
    }

    if (rating < 1 || rating > 10) {
      return alert("❌ Rating must be between 1 and 10.");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/v1/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          movieId: booking.movieId,
          bookingId: booking.id,
          comment,
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      // ✅ Success
      alert("✅ Review submitted successfully!");
      setComment("");
      setRating(5);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 max-w-xl mx-auto  shadow-md rounded-2xl p-6 border">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        ⭐ Write a Review for{" "}
        <span className="text-blue-600">{movie.movieName}</span>
      </h2>

      {/* ⭐ Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Rating (1 - 10)
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-28 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 📝 Comment */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience..."
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🚀 Submit */}
      <button
        onClick={handleSubmitReview}
        disabled={loading || !booking}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

      {/* ⚠️ No booking warning */}
      {!booking && (
        <p className="text-sm text-red-500 mt-3">
          ⚠️ You must book this movie before submitting a review.
        </p>
      )}
    </div>
  );
}