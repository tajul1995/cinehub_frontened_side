"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface IMoviePayment {
    movieName: string;
    price: number;
}

export interface IPayment {
  id: string;
  movie: {
    movieName: string;
    price: number;
  };
  booking: {
    status: string;
    paymentStatus: string;
  };
};
export const getAllPayments = async () => {
    const doctors = await httpClient.get<IPayment[]>('/review');
    console.log(doctors, "payment server");
    return doctors;
}