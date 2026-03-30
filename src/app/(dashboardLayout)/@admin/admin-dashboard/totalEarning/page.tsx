import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import { totalEarning } from './_action';
import DashboardChart from '@/components/modules/movies/TotalEarning';

const EarningPage = async() => {
    const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["TotalEarning"],
    queryFn: totalEarning,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>total earning</h2>
     <DashboardChart />
   </HydrationBoundary>
  )
}

export default EarningPage
