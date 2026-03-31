"use server";

import { httpClient } from "@/lib/axios/httpClient";

// Reusable Person Interface
export interface IPerson {
  name: string
  role: string
}

// Main Movie Interface
export interface IMovie {
    id: string
  movieName: string

  type: string // extendable
  price : number
  categories: string[]

  poster: string
  trailerUrl: string
  videoUrl: string

  rating: number // 1–10
  duration: number // in minutes
  publishedYear: number

  story: string

  cast: IPerson[]
  directors: IPerson[]
  producers: IPerson[]
}

export const getAllMovies = async () => {
    const doctors = await httpClient.get<IMovie[]>('/createMovie');
    console.log(doctors, "server");
    return doctors;
}