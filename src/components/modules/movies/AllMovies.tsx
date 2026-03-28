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
    <div className="grid grid-cols-4 gap-3 max-w-7xl mx-auto mt-4">
      {
        data?.data?.map((movie: IMovie) => <MovieCard key={movie.id} movie={movie}></MovieCard>)
      }
    </div>
  )
}

export default AllMovies
