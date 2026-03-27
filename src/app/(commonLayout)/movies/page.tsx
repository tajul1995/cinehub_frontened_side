import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import { getAllMovies } from './_action';
import AllMovies from '@/components/modules/movies/AllMovies';

const MoviesPage =async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movies"],
    queryFn: getAllMovies,
  });
  return (
     <HydrationBoundary state={dehydrate(queryClient)} >
      <AllMovies />
   </HydrationBoundary>
  )
}

export default MoviesPage
