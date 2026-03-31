/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import { createMovies, IMovie } from "@/app/create-movie/_action";
import { createMovies, IMovie } from "@/app/(dashboardLayout)/@admin/admin-dashboard/createMovie/_action";



export default function CreateMovieForm() {
  const [movie, setMovie] = useState<IMovie>({
    id: "",
    movieName: "",
    type: "",
    price: 0,
    categories: [],
    poster: "",
    trailerUrl: "",
    videoUrl: "",
    rating: 1,
    duration: 0,
    publishedYear: new Date().getFullYear(),
    story: "",
    cast: [],
    directors: [],
    producers: [],
  });

  const mutation = useMutation({
    mutationFn: createMovies,
    onSuccess: () => alert("Movie Created ✅"),
    onError: () => alert("Error ❌"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let val: any = value;

    if (["price", "rating", "duration", "publishedYear"].includes(name)) {
      val = Number(value);

      
      if (name === "price" && val < 0) val = 0; // no negative price
      if (name === "rating") {
        if (val < 1) val = 1;
        if (val > 10) val = 10;
      }
    }

    setMovie((prev) => ({ ...prev, [name]: val }));
  };

  const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(",").map((c) => c.trim());
    setMovie((prev) => ({ ...prev, categories: value }));
  };

  const handlePersonChange = (
    type: "cast" | "directors" | "producers",
    index: number,
    field: "name" | "role",
    value: string
  ) => {
    const updated = [...movie[type]];
    updated[index][field] = value;
    setMovie((prev) => ({ ...prev, [type]: updated }));
  };

  const addPerson = (type: "cast" | "directors" | "producers") => {
    setMovie((prev) => ({
      ...prev,
      [type]: [...prev[type], { name: "", role: "" }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (movie.rating < 1 || movie.rating > 10) {
      alert("Rating must be between 1 and 10");
      return;
    }

    if (movie.price < 0) {
      alert("Price cannot be negative");
      return;
    }

    const payload = {
      ...movie,
      id: crypto.randomUUID(),
    };

    mutation.mutate(payload);
  };

  return (
    <form className="max-w-4xl mx-auto p-6 space-y-6 bg-yellow-400 text-black rounded-2xl shadow-xl" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center">🎬 Create Movie</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Movie Name</label>
          <input name="movieName" onChange={handleChange} className="input w-full border-2 border-black border-opacity-50 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Type</label>
          <input name="type" onChange={handleChange} className="input w-full border-2 border-black border-opacity-50 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input name="price" type="number" min={0} onChange={handleChange} className="input w-full border-2 border-black border-opacity-50 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating (1-10)</label>
          <input name="rating" type="number" min={1} max={10} onChange={handleChange} className="input w-full border-2 border-black border-opacity-50 rounded" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block mb-1 font-medium">Categories</label>
        <input onChange={handleCategories} className="input w-full border-2 border-black border-opacity-50 rounded" placeholder="Action, Drama" />
      </div>

      {/* Media */}
      <div className="grid grid-cols-1 gap-3">
        <input name="poster" placeholder="Poster URL" onChange={handleChange} className="input border-2 border-black border-opacity-50 rounded" />
        <input name="trailerUrl" placeholder="Trailer URL" onChange={handleChange} className="input border-2 border-black border-opacity-50 rounded" />
        <input name="videoUrl" placeholder="Video URL" onChange={handleChange} className="input" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4">
        <input name="duration" type="number" placeholder="Duration" onChange={handleChange} className="input border-2 border-black border-opacity-50 rounded" />
        <input name="publishedYear" type="number" placeholder="Year" onChange={handleChange} className="input border-2 border-black border-opacity-50 rounded" />
      </div>

      <textarea name="story" placeholder="Story" onChange={handleChange} className="input w-full border-2 border-black border-opacity-50 rounded" />

      {/* Cast */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">🎭 Cast</h3>
        {movie.cast.map((p, i) => (
          <div key={i} className="bg-gray-50 p-3 rounded-lg">
            <input placeholder="Name" onChange={(e) => handlePersonChange("cast", i, "name", e.target.value)} />
            <input placeholder="Role" onChange={(e) => handlePersonChange("cast", i, "role", e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={() => addPerson("cast")} className="text-blue-600">+ Add Cast</button>
      </div>

      {/* Directors */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">🎬 Directors</h3>
        {movie.directors.map((p, i) => (
          <div key={i} className="bg-amber-500 text-black p-3 rounded-lg ">
            <input placeholder="Name" onChange={(e) => handlePersonChange("directors", i, "name", e.target.value)} />
            <input placeholder="Role" onChange={(e) => handlePersonChange("directors", i, "role", e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={() => addPerson("directors")} className="text-blue-600">+ Add Director</button>
      </div>

      {/* Producers */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">🎥 Producers</h3>
        {movie.producers.map((p, i) => (
          <div key={i} className="bg-amber-500 text-black  p-3 rounded-lg">
            <input placeholder="Name" onChange={(e) => handlePersonChange("producers", i, "name", e.target.value)} />
            <input placeholder="Role" onChange={(e) => handlePersonChange("producers", i, "role", e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={() => addPerson("producers")} className="text-blue-600">+ Add Producer</button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full">
        {mutation.isPending ? "Submitting..." : "Submit Movie"}
      </button>
    </form>
  );
}
