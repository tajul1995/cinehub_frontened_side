"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const movies = [
  {
    id: 1,
    title: "Dune 2",
    image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 9.2,
    type: "Movie",
  },
  {
    id: 2,
    title: "Loki Season 2",
    image: "https://images.unsplash.com/photo-1511875762315-c773eb98eec0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 8.8,
    type: "Series",
  },
  {
    id: 3,
    title: "Oppenheimer",
    image: "https://images.unsplash.com/photo-1641549058491-8a3442385da0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 9.0,
    type: "Movie",
  },
  {
    id: 4,
    title: "The Boys",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 8.7,
    type: "Series",
  },
  {
    id: 5,
    title: "Avatar 2",
    image: "https://images.unsplash.com/photo-1676491167770-bce474fe0024?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
    rating: 8.5,
    type: "Movie",
  },
  {
    id: 6,
    title: "Dune 2",
    image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 9.2,
    type: "Movie",
  },
  {
    id: 7,
    title: "Loki Season 2",
    image: "https://images.unsplash.com/photo-1511875762315-c773eb98eec0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 8.8,
    type: "Series",
  },
  {
    id: 8,
    title: "Oppenheimer",
    image: "https://images.unsplash.com/photo-1641549058491-8a3442385da0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 9.0,
    type: "Movie",
  },
  {
    id: 9,
    title: "The Boys",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 8.7,
    type: "Series",
  },
  {
    id: 10,
    title: "Avatar 2",
    image: "https://images.unsplash.com/photo-1676491167770-bce474fe0024?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
    rating: 8.5,
    type: "Movie",
  },
  {
    id: 11,
    title: "The Boys",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 8.7,
    type: "Series",
  },
  {
    id: 12,
    title: "Avatar 2",
    image: "https://images.unsplash.com/photo-1676491167770-bce474fe0024?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
    rating: 8.5,
    type: "Movie",
  },
]

export default function PopularGallery() {
  return (
    <div className="px-6 py-10 overflow-hidden "> {/* ✅ FIX */}
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 my-3 text-center text-yellow-400"
      >
         Popular Movies And Series
      </motion.h2>

      {/* Scroll Container */}
      <div className="grid grid-cols-4  gap-6 overflow-x-auto scrollbar-hide scroll-smooth">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }} 
            className="flex-shrink-0 w-[220px]" 
          >
            <Card className="relative overflow-hidden rounded-2xl">
              
              <img
                src={movie.image}
                className="h-[320px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{movie.title}</h3>

                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary">{movie.type}</Badge>
                  <span className="text-sm">⭐ {movie.rating}</span>
                </div>
              </div>

            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}