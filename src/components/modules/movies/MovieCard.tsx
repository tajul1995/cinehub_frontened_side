"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface IMovie {
  id: string;
  movieName: string;
  poster: string;
  rating: number;
  duration: number;
  price: number;
  publishedYear: number | null;
  categories: string[];
}

export default function MovieCard({ movie }: { movie: IMovie }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden rounded-2xl group h-full flex flex-col">

        {/* Poster */}
        <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-200">
          <img
            src={movie.poster || "/fallback.jpg"}
            alt={movie.movieName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full">
              <Play className="text-white" size={24} />
            </div>
          </div>

          {/* Rating */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-900 text-white px-2 py-1 text-xs font-bold rounded">
            ⭐ {movie.rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow space-y-2">

          {/* Title */}
          <h2 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-1 text-lime-600">
            {movie.movieName}
          </h2>

          {/* Meta */}
          <div className="flex justify-between text-xs sm:text-sm text-lime-300">
            <span>{movie.duration} min</span>
            <span>{movie.publishedYear ?? "Upcoming"}</span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 mt-1 text-lime-300">
            {movie.categories.slice(0, 2).map((cat, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Price */}
          <div className="text-base sm:text-lg font-bold text-amber-600">
            TK {movie.price}
          </div>

          
          <Link href={`/movies/movie/${movie.id}`} className="mt-auto">
            <Button className="w-full text-xs sm:text-sm font-bold uppercase text-amber-950 bg-cyan-400">
              View Details
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}