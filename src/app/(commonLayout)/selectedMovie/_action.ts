"use server";

import { httpClient } from "@/lib/axios/httpClient";

// Movie
export interface IReview {
    comment: string;
    id:string
}
export interface IMovie {
  id: string;
  movieName: string;
  type: string;
  categories: string[];
  price: number;
  poster: string;
  trailerUrl: string;
  videoUrl: string;
  rating: number;
  duration: number;
  publishedYear: number;
  story: string;
  createdAt: string;
  updatedAt: string;
  reviews:IReview[]
}

// Booking
export interface IBooking {
  id: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PAID" | "UNPAID";
  createdAt: string;
  updatedAt: string;
  movieId: string;
  userId: string;
  movie: IMovie;
}

// User
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "BLOCKED";
  isDeleted: boolean;
  deletedAt: string | null;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  bookings: IBooking[];
}


export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser;
}

export const getMyDetails = async () => {
    const doctors = await httpClient.get<IUser>('/auth/me');
    console.log(doctors, "full user details from server");
    return doctors;
}