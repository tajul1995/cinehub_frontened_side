"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar, PlayCircle } from "lucide-react";

type Movie = {
  id: string;
  movieName: string;
  categories: string[];
  price: number;
  poster: string;
  trailerUrl: string;
  rating: number;
  duration: number;
  publishedYear: number;
  story: string;
  cast: { name: string; role: string }[];
  directors: { name: string }[];
  producers: { name: string }[];
};

const MovieDetailsCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex justify-center px-4 py-10">
      <Card className="max-w-5xl w-full rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
        {/* 🎥 Poster */}
        <div className="relative h-[400px] md:h-full">
          <Image
            src={movie.poster}
            alt={movie.movieName}
            fill
            className="object-cover"
          />
        </div>

        {/* 📄 Content */}
        <CardContent className="p-6 space-y-4">
          
          {/* Title */}
          <h2 className="text-3xl font-bold">{movie.movieName}</h2>

          {/* Rating + Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1 text-yellow-500 font-semibold">
              <Star size={16} /> {movie.rating}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={16} /> {movie.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Calendar size={16} /> {movie.publishedYear}
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {movie.categories.map((cat, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-amber-300 text-black font-bold rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Story */}
          <p className="text-green-600 line-clamp-4">
            {movie.story}
          </p>

          {/* Cast */}
          <div>
            <h4 className="font-semibold">🎭 Cast:</h4>
            <p className="text-sm text-lime-300">
              {movie.cast.map((c) => `${c.name} (${c.role})`).join(", ")}
            </p>
          </div>

          {/* Director */}
          <div>
            <h4 className="font-semibold">🎬 Director:</h4>
            <p className="text-sm text-lime-300">
              {movie.directors.map((d) => d.name).join(", ")}
            </p>
          </div>

          {/* Producer */}
          <div>
            <h4 className="font-semibold">💼 Producer:</h4>
            <p className="text-sm text-lime-300">
              {movie.producers.map((p) => p.name).join(", ")}
            </p>
          </div>

          {/* 💳 Payment Section */}
          <div className="pt-4 border-t space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                {movie.price === 0 ? "Free 🎉" : `$${movie.price}`}
              </span>
            </div>

            <div className="flex gap-3">
              {/* Watch */}
              <Button className="flex-1">
                ▶ Watch Now
              </Button>

              {/* Trailer */}
              <Button variant="outline" className="flex-1 flex items-center gap-1">
                <PlayCircle size={16} />
                Trailer
              </Button>
            </div>

            {/* Payment Button */}
            {movie.price > 0 && (
              <Button className="w-full bg-green-600 hover:bg-green-700">
                💳 Buy / Rent Movie
              </Button>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetailsCard;