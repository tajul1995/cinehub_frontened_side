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
export const deleteReview = async (id: string) => {
//   const client = await serverHttpClient();
  const res = await httpClient.delete(`/review/${id}`);
  return res.data;
};

export const updateReviewStatus = async ({
  id,
  status,
}: {
  id: string;
  status: "PENDING" | "APPROVED";
}) => {
  

  const res = await httpClient.patch(`/review/${id}`, {
    status,
  });

  return res.data;
};