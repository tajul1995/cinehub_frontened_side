"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Movie = {
  id: string;
  movieName: string;
  poster: string;
  price: number;
};

export default function BookedMovieCard({ movie }: { movie: Movie }) {
  const router = useRouter();

  const handlePayment = () => {
    router.push(`/movies/${movie.id}/booking/payment`);
  };

  return (
    <div className="max-w-md rounded-2xl shadow-lg overflow-hidden border bg-white">
      {/* Poster */}
      <div className="relative w-full h-64">
        <Image
          src={movie.poster}
          alt={movie.movieName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold">{movie.movieName}</h2>

        <p className="text-lg font-semibold text-green-600">
          ${movie.price}
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          💳 Pay Now
        </button>
      </div>
    </div>
  );
}