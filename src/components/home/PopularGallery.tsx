"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const movies = [
  {
    id: 1,
    title: "Dune 2",
    image:
      "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3",
    rating: 9.2,
    type: "Movie",
  },
  {
    id: 2,
    title: "Loki Season 2",
    image:
      "https://images.unsplash.com/photo-1511875762315-c773eb98eec0",
    rating: 8.8,
    type: "Series",
  },
  {
    id: 3,
    title: "Oppenheimer",
    image:
      "https://images.unsplash.com/photo-1641549058491-8a3442385da0",
    rating: 9.0,
    type: "Movie",
  },
  {
    id: 4,
    title: "The Boys",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    rating: 8.7,
    type: "Series",
  },
  {
    id: 5,
    title: "Avatar 2",
    image:
      "https://images.unsplash.com/photo-1676491167770-bce474fe0024",
    rating: 8.5,
    type: "Movie",
  },
  {
    id: 6,
    title: "Dune 2",
    image:
      "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3",
    rating: 9.2,
    type: "Movie",
  },
  {
    id: 7,
    title: "Dune 2",
    image:
      "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3",
    rating: 9.2,
    type: "Movie",
  },
  {
    id: 8,
    title: "The Boys",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    rating: 8.7,
    type: "Series",
  },
  {
    id: 9,
    title: "The Boys",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    rating: 8.7,
    type: "Series",
  },
  {
    id: 10,
    title: "Avatar 2",
    image:
      "https://images.unsplash.com/photo-1676491167770-bce474fe0024",
    rating: 8.5,
    type: "Movie",
  }
];

export default function PopularGallery() {
  return (
    <div className="px-4 sm:px-2 lg:px-10 py-10">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400"
      >
        Popular Movies And Series
      </motion.h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="relative overflow-hidden rounded-2xl">
              <img
                src={movie.image}
                className="h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px] w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

              {/* Content */}
              <div className="absolute bottom-0 p-4 text-white w-full">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate">
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {movie.type}
                  </Badge>
                  <span className="text-xs sm:text-sm">
                    ⭐ {movie.rating}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
