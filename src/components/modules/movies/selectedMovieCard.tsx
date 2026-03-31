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
  const approvedReviews = movie.reviews.filter(
    (r) => r.status === "APPROVED"
  );

  return (
    <div className="w-full max-w-6xl mx-auto bg-amber-950 rounded-2xl shadow-lg overflow-hidden">
      
      {/* 🔥 Responsive Layout */}
      <div className="flex flex-col md:flex-row">
        
        {/* 🎬 Poster */}
        <div className="w-full md:w-1/2">
          <img
            src={movie.poster}
            className="w-full h-[250px] sm:h-[300px] md:h-full object-cover"
          />
        </div>

        {/* 📄 Content */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 space-y-4">
          
          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {movie.movieName}
          </h2>

          {/* Type + Rating */}
          <div className="flex justify-between text-sm sm:text-base text-amber-400">
            <span>🎬 {movie.type}</span>
            <span>⭐ {movie.rating}</span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {movie.categories.map((cat, i) => (
              <span
                key={i}
                className="bg-amber-300 text-black font-bold px-2 py-1 rounded text-xs sm:text-sm"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Year */}
          <p className="text-xs sm:text-sm text-gray-300">
            📅 {movie.publishedYear}
          </p>

          {/* Reviews */}
          <div className="space-y-2">
            <h3 className="font-semibold text-white">💬 Reviews</h3>

            {approvedReviews.length === 0 ? (
              <p className="text-sm text-gray-400">No approved reviews</p>
            ) : (
              approvedReviews.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="bg-amber-300 text-black font-bold p-2 rounded"
                >
                  <p className="text-xs sm:text-sm">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    
      <div className="p-4 sm:p-6">
        <ReviewSection movie={movie} />
      </div>
    </div>
  );
}