"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface IMovie {
  id: string
  movieName: string
  poster: string
  rating: number
  duration: number
  publishedYear: number | null
  categories: string[]
}

export default function MovieCard({ movie }: { movie: IMovie }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="w-[250px] flex-shrink-0"
    >
      <Card className="relative overflow-hidden rounded-2xl group cursor-pointer">

        {/* Poster */}
        <div className="relative h-[360px] w-full overflow-hidden">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${movie.poster}`}
            alt={movie.movieName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            
            {/* Play Button */}
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
              <Play className="text-white" size={28} />
            </div>

          </div>

          {/* Rating */}
          <div className="absolute top-3 right-3 bg-green-900 text-black px-2 py-1 text-xs font-bold rounded">
            ⭐ {movie.rating}
          </div>

        </div>

        {/* Content */}
        <div className="p-4 space-y-2">

          {/* Title */}
          <h2 className="font-semibold text-lg line-clamp-1">
            {movie.movieName}
          </h2>

          {/* Meta */}
          <div className="flex justify-between text-sm text-gray-400">
            <span>{movie.duration} min</span>
            <span>
               publishedYear: 
              {movie.publishedYear ? movie.publishedYear : "Upcoming"}
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.categories.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
            <Button className="w-full font-bold uppercase text-amber-950">
              <Link href={`movies/movie/${movie.id}`}>view details</Link>
            </Button>
        </div>

      </Card>
    </motion.div>
  )
}