import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import React from 'react'
// import { createMovies, IMovie } from './_action';
import CreateMovieForm from '@/components/modules/movies/createMovieFrorm';

const CreateMovie = () => {
  
  
  return (
  //   <HydrationBoundary state={dehydrate(queryClient)} >
  //     <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>all movie and series collection</h2>
    
  //  </HydrationBoundary>
  <div>
    <CreateMovieForm />
  </div>
  )
}

export default CreateMovie
