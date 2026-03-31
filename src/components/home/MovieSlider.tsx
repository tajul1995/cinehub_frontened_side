/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Movie = {
  id: string;
  movieName: string;
  poster: string;
  rating: number;
};

const generateMovies = (count: number): Movie[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    movieName: `Movie ${i + 1}`,
    poster: `https://picsum.photos/300/400?random=${i + 1}`,
    rating: Number((Math.random() * 4 + 6).toFixed(1)),
  }));
};

export default function MovieSlider() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMovies(generateMovies(12));
  }, []);

  // ✅ Responsive scroll based on container width
  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Auto slide (responsive)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 py-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-amber-400 text-center">
        Trending Movies
      </h2>

      <div className="relative">
        {/* ⬅️ Left */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-amber-700 text-white p-2 sm:p-3 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        {/* ➡️ Right */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-amber-700 text-white p-2 sm:p-3 rounded-full"
        >
          <ChevronRight size={20} />
        </button>

        {/* 🎞️ Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
                flex-shrink-0 
                w-[70%] 
                sm:w-[45%] 
                md:w-[30%] 
                lg:w-[22%] 
                xl:w-[18%]
                bg-white rounded-2xl shadow-md hover:shadow-xl 
                transform hover:-translate-y-2 transition duration-300
              "
            >
              <div className="relative">
                <img
                  src={movie.poster}
                  alt={movie.movieName}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover rounded-t-2xl"
                />

                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
                  <Star size={12} /> {movie.rating}
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-800 truncate">
                  {movie.movieName}
                </h3>

                <button className="mt-2 sm:mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-1.5 rounded-lg transition">
                  ▶ Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}