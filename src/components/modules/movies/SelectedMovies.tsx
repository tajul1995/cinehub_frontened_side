/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { getMyDetails } from "@/app/(commonLayout)/selectedMovie/_action";
import { useQuery } from "@tanstack/react-query";
import SelectedMovieCard from "./selectedMovieCard";

const SelectedMovies = () => {
    const { data  } = useQuery({
       queryKey: ["details"],
       queryFn: () => getMyDetails(),
     });
     console.log(data?.data?.bookings,"selected movies client")
  return (
    <div className="lg:max-w-7xl lg:mx-auto mt-3">
     
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-2 ">
        {
        data?.data?.bookings?.map((booking: any) => (
          <div key={booking.id}>
            <SelectedMovieCard movie={booking.movie} />
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default SelectedMovies
