"use client"

import { getAllMovies, IMovie } from "@/app/(commonLayout)/movies/_action";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";




const AllMovies = () => {
     const { data  } = useQuery({
       queryKey: ["movies"],
       queryFn: () => getAllMovies(),
     });

    //  console.log(data);
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 sm:grid-cols-1 md-gap-2 sm-gap-1 gap-3 lg:max-w-7xl lg:mx-auto mt-4 md:mt-2">
      {
        data?.data?.map((movie: IMovie) => <MovieCard key={movie.id} movie={movie}></MovieCard>)
      }
    </div>
  )
}

export default AllMovies
