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
    <div className="max-w-7xl mx-auto mt-3">
     
      <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 md:gap-3 sm:gap-1 mt-3 ">
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
