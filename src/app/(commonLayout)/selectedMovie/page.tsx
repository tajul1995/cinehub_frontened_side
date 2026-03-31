import React from 'react'
import { getMyDetails } from './_action';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SelectedMovies from '@/components/modules/movies/SelectedMovies';

const SelectedMoviePage = async() => {
   const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["details"],
    queryFn: getMyDetails,
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)} >
      <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>all movie and series collection</h2>
       <SelectedMovies></SelectedMovies>
   </HydrationBoundary>
    </div>
  )
}

export default SelectedMoviePage
