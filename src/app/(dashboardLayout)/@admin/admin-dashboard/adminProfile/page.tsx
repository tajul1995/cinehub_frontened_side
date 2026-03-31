import { getMyDetails } from '@/app/(commonLayout)/selectedMovie/_action';
import AdminProfileCard from '@/components/dashboardCollection/adminProfile'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import { getUserInfo } from '@/services/auth.service'
import React from 'react'

const AdminProfilePage =async () => {
    //  const res = await getUserInfo()
    const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adminDetails"],
    queryFn: getMyDetails,
  });
  return (
     <div>
      <HydrationBoundary state={dehydrate(queryClient)} >
      <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>all movie and series collection</h2>
      <AdminProfileCard  />
   </HydrationBoundary>
    </div>
    
  )
}

export default AdminProfilePage
