"use server";

import { IMovie } from "@/app/(commonLayout)/movies/_action";
import { httpClient } from "@/lib/axios/httpClient";

export interface IComment {
     id: string;
    rating: number;
    comment: string;
    status:string;
    movie:IMovie
}
export const getAllComments = async () => {
    const doctors = await httpClient.get<IComment[]>('/review');
    console.log(doctors, "review server");
    return doctors;
}
export const deleteComment = async (id: string) => {
  const res = await httpClient.delete(
    `/review/${id}`
  );
  return res.data;
};
export const updateComment = async (
  id: string,
  payload: { comment: string; rating: number }
) => {
  const res = await httpClient.patch(`/review/${id}`, payload);
  return res.data;
};