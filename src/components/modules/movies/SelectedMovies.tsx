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
        {data?.data?.bookings ? (
          data?.data?.bookings?.map((booking: any) => (
            <div key={booking.id}>
              <SelectedMovieCard movie={booking.movie} />
            </div>
          ))
        ) : (
          <h2 className="text-center text-2xl font-bold text-red-500">No booked movies found.</h2>
        )
      }
      </div>
    </div>
  )
}

export default SelectedMovies
