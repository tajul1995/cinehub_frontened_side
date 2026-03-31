"use client";

import { useRef } from "react";

type Movie = {
  id: string;
  movieName: string;
  poster: string;
  rating: number;
};

const dummyMovies: Movie[] = [
  {
    id: "1",
    movieName: "Interstellar",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    rating: 8.6,
  },
  {
    id: "2",
    movieName: "Inception",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    rating: 8.8,
  },
];

export default function MovieSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
   <div>
     <div className="relative w-full px-6 ">
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black text-white px-3 py-2 rounded"
      >
        ◀
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black text-white px-3 py-2 rounded"
      >
        ▶
      </button>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {dummyMovies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] bg-white rounded-xl shadow hover:scale-105 transition"
          >
            <img
              src={movie.poster}
              alt={movie.movieName}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-3">
              <h3 className="font-semibold text-sm">{movie.movieName}</h3>
              <p className="text-xs text-gray-500">⭐ {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

   </div>
  );
}