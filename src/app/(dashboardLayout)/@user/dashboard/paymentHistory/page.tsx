import React from 'react'
import { getAllPayments } from './_action';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import BookingTable from '@/components/modules/movies/CommentTable';

const PaymentPage =async () => {
    const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>payment history</h2>
      <BookingTable />
   </HydrationBoundary>
  )
}

export default PaymentPage