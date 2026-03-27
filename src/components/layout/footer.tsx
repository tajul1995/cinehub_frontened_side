"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Facebook, Twitter, Instagram, Play } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-orange-950 text-yellow-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-4">🎬 CineHub</h1>
          <p className="text-gray-400">
            Discover, rate, and stream your favorite movies and series anytime.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/movies">Movies</Link></li>
            <li><Link href="/series">Series</Link></li>
            <li><Link href="/watchlist">Watchlist</Link></li>
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2 text-gray-400">
            <li>Action</li>
            <li>Drama</li>
            <li>Comedy</li>
            <li>Sci-Fi</li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
          <p className="text-gray-400 mb-4">
            Get latest updates and new releases.
          </p>

          <div className="flex gap-2">
            <Input placeholder="Enter email" />
            <Button>Join</Button>
          </div>
        </motion.div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-gray-400 font-bold text-xl text-center">
          © {new Date().getFullYear()} CineHub. All rights reserved.
        </p>

        {/* Social Icons */}
        {/* <div className="flex gap-4">
          <Facebook className="cursor-pointer hover:text-red-500 transition" />
          <Twitter className="cursor-pointer hover:text-red-500 transition" />
          <Instagram className="cursor-pointer hover:text-red-500 transition" />
          <Play className="cursor-pointer hover:text-red-500 transition" />
        </div> */}
      </div>
    </footer>
  )
}