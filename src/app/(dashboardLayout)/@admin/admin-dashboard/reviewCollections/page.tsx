import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import { getAllReviewsCollections } from './_action';
 import ReviewsTable from '@/components/modules/movies/AllReviews';

const ReviewsCollection =async () => {
    const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["AllReviewsCollections"],
    queryFn: getAllReviewsCollections,
  });
    
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)} >
      <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>all comment</h2>
       <ReviewsTable /> 
   </HydrationBoundary>
    </div>
  )
}

export default ReviewsCollection
