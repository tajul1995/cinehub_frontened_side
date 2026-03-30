import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import { getAllComments } from './_action';
import AllComment from '@/components/modules/movies/allComment';

const MyComment =async () => {
    const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["comments"],
    queryFn: getAllComments,
  });
    
    
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>all comment</h2>
      <AllComment />
   </HydrationBoundary>
  )
}

export default MyComment
