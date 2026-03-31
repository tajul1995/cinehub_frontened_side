/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Movie = {
  id: string;
  movieName: string;
  poster: string;
  price: number;
};

export default function BookedMovieCard({ movie }: { movie: Movie }) {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo();
        setSession(res);
      } catch (error) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);

  const handlePayment = () => {
    router.push(`/movies/${movie.id}/booking/payment`);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="max-w-md rounded-2xl shadow-lg overflow-hidden border bg-white">
      
      {/* Poster */}
      <div className="relative w-full h-64">
        <Image
          src={movie.poster}
          alt={movie.movieName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold">{movie.movieName}</h2>

        <p className="text-lg font-semibold text-green-600">
          ${movie.price}
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          💳 Pay Now
        </button>
      </div>
    </div>
  );
}