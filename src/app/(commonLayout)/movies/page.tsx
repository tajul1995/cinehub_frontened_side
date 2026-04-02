
// import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
// import { getAllMovies } from './_action';
import AllMovies from '@/components/modules/movies/AllMovies';

const MoviesPage =() => {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["movies"],
  //   queryFn: getAllMovies,
  // });
  return (
  //    <HydrationBoundary state={dehydrate(queryClient)} >
  //     <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>all movie and series collection</h2>
      
  //      <AllMovies />
      
     
  //  </HydrationBoundary>
  <div>
    <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>all movie and series collection</h2>
    <AllMovies />
  </div>
  )
}

export default MoviesPage
