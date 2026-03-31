/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar, PlayCircle } from "lucide-react";

import { useState } from "react";
import PaymentForm from "./PaymentForm";

 export type Movie = {
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
  bookings: {
    id: string;
    
  };
};

const MovieDetailsCard = ({ movie }: { movie: Movie }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | undefined>(undefined);

  const handleBooked = async (movieId: string) => {
  console.log("Clicked:", movieId);

  try {
    const res = await fetch("http://localhost:5000/api/v1/booking", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId }),
    });

    // console.log("Response form movie details:", res);

    const data = await res.json();
    console.log("Data:", data);
    if(data.success){
      alert("Movie booked successfully!");
      setOpen(true);
    }
     setBookingId(data?.data?.booking?.id);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  
// Object
// data
// : 
// appointment
// : 
// {id: 'f23b1624-0c06-4ad7-9217-1a4e8c679389', status: 'SCHEDULED', paymentStatus: 'UNPAID', createdAt: '2026-03-30T06:22:28.497Z', updatedAt: '2026-03-30T06:22:28.497Z', …}
// payment
// : 
// {id: '80434072-3f0f-43a6-b266-6d992b56f68b', amount: 900, transactionId: '019d3d68-7296-7745-ab16-f23809f94443', invoiceUrl: null, stripeEventId: null, …}
// paymentUrl
// : 
// "https://checkout.stripe.com/c/pay/cs_test_a1evHLcqGtcwYhWrt5vafwIjYEwjMnijlnpfrUx1szZiW1MznhyN1CkxaL#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdkdWxOYHwnPyd1blpxYHZxWjA0S0xnQlxJVURvU3N%2Fdz1GN1RKNmhdYlZpfWJzTzU1bTxqNH99VEliPGxAMjJ1MDBkX2wwRnxuU1ZIbHJVdDZsUjRJcUtAYTFhR11sVXZnRnxzZzdMPVw9NTVtX0w2UkdQSScpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl"
// [[Prototype]]
// : 
// Object
// message
// : 
// "Booking created successfully"
// success
// : 
// true
// [[Prototype]]
// : 
// Object
//   if (!movie) {
//   return (
//     <div className="flex justify-center items-center ">
//       <p>Loading movie...</p>
//     </div>
//   );
// }
// const id=movie.id
  return (
    <div className="flex justify-center px-4 py-10">
      {
        !open&&<Card className="max-w-5xl w-full rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
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
             
              <Button onClick={()=>handleBooked(movie.id)}   className="w-full bg-green-600 hover:bg-green-700">
                💳 booked Movie
              </Button>
            
          </div>

        </CardContent>
      </Card>
      }
      {
        open&&bookingId&&<PaymentForm movie={movie} bookingId={bookingId}  ></PaymentForm>
      }
    </div>
  );
};

export default MovieDetailsCard;