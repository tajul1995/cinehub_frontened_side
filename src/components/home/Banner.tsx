"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const movies = [
  {
    id: 1,
    title: "Inception",
    description: "A mind-bending thriller by Christopher Nolan.",
    image:"https://images.unsplash.com/photo-1616530940355-351fabd9524b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Interstellar",
    description: "Journey beyond the stars to save humanity.",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "The rise of Gotham’s legendary hero.",
    image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    title: "The Dark Knight2",
    description: "The rise of Gotham’s legendary hero.",
    image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
  },
]

export default function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

 
  React.useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="min-w-full h-[600px] relative flex items-center"
            >
              {/* Background Image */}
              <img
                src={movie.image}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Animated Content */}
              <AnimatePresence>
                {selectedIndex === index && (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-yellow-200 p-10 max-w-xl"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {movie.title}
                    </h1>

                    <p className="mb-6 text-lg text-gray-200">
                      {movie.description}
                    </p>

                    <div className="flex gap-4">
                      <Button className="bg-red-600 hover:bg-red-700">
                        ▶ Watch Now
                      </Button>

                      <Button variant="outline">
                        + Watchlist
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 w-6 rounded-full transition ${
              selectedIndex === index
                ? "bg-red-500"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}