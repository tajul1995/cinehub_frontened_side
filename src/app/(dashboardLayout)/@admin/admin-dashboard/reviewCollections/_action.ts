"use server";

import { httpClient } from "@/lib/axios/httpClient";

// export interface IMoviePayment {
//     movieName: string;
//     price: number;
// }

export interface ICommentsCollection {
  id: string;
  comment: string;
  status: string;
  movie: {
    movieName: string;
    
  };
  user:{
    name:string;
  }
};
export const getAllReviewsCollections = async () => {
    const doctors = await httpClient.get<ICommentsCollection[]>('/review');
    console.log(doctors, "payment server");
    return doctors;
}