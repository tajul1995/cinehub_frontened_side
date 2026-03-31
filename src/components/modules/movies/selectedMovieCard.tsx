"use client";

import ReviewSection from "./UserReviewSection";

type Review = {
  id: string;
  comment: string;
  status: "APPROVED" | "PENDING";
};
type Booking = {
  id: string;
  movieId: string;
};
type Movie = {
  id: string;
  movieName: string;
  type: string;
  categories: string[];
  rating: number;
  publishedYear: number;
  poster: string;
  reviews: Review[];
    bookings: Booking[];
};

export default function SelectedMovieCard({ movie }: { movie: Movie }) {
     console.log(movie,"selected movie card")
  const approvedReviews = movie.reviews.filter(
    (r) => r.status === "APPROVED"
  );

  return (
    <div className="max-w-md  rounded-2xl shadow-lg overflow-hidden bg-amber-950">
      
      {/* Poster */}
      <img src={movie.poster} className="w-full h-56 object-cover" />

      <div className="p-4 space-y-3">
        
        {/* Title */}
        <h2 className="text-xl font-bold">{movie.movieName}</h2>

        {/* Type + Rating */}
        <div className="flex justify-between text-sm text-amber-600">
          <span>🎬 {movie.type}</span>
          <span>⭐ {movie.rating}</span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {movie.categories.map((cat, i) => (
            <span key={i} className="bg-amber-300 text-black font-bold px-2 py-1 rounded text-xs">
              {cat}
            </span>
          ))}
        </div>

        {/* Year */}
        <p className="text-sm text-gray-600">
          📅 {movie.publishedYear}
        </p>

        {/* Reviews */}
        <div className="space-y-2">
          <h3 className="font-semibold">💬 Reviews</h3>

          {approvedReviews.length === 0 ? (
            <p className="text-sm text-gray-400">No approved reviews</p>
          ) : (
            approvedReviews.map((review) => (
              <div key={review.id} className="bg-amber-300 text-black font-bold p-2 rounded">
                <p className="text-sm">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <ReviewSection movie={movie} />
    </div>
  );
}