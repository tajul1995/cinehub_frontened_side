"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export interface IMovie {
  id: string;
  movieName: string;
  type: string;
  price: number;
  categories: string[];
  poster: string;
  trailerUrl: string;
  videoUrl: string;
  rating: number;
  duration: number;
  publishedYear: number;
  story: string;
}

const AllMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  const fetchMovies = async (query?: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/createMovie${query ? `?${query}` : ""}`
      );
      const data = await res.json();
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

    
      <div className="flex flex-col lg:flex-row gap-3 mb-6">

        {/* Category */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="Category (Write category name correctly)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={() => {
              if (!category.trim()) return;
              fetchMovies(`category=${category}`);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Category
          </button>
        </div>

        {/* Year */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="Year (2023)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={() => {
              if (!year.trim()) return;
              fetchMovies(`year=${year}`);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Year
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setCategory("");
            setYear("");
            fetchMovies();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded w-full lg:w-auto"
        >
          Reset
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Movies Grid */}
      <div className="grid gap-4 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;