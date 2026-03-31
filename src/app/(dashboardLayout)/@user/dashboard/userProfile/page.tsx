

import { getMyDetails } from "@/app/(commonLayout)/selectedMovie/_action";
import ProfileCard from "@/components/dashboardCollection/userProfile";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import { getUserInfo } from "@/service/auth.service";

const UserProfilePage = async () => {
   const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["userDetails"],
    queryFn: getMyDetails,
  });
 
  // const res = await getUserInfo()
      
      // console.log(res,"res from user profile page")

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)} >
      <h2 className='text-center my-4 font-bold text-2xl uppercase text-amber-800 '>your profile</h2>
        <ProfileCard /> 
   </HydrationBoundary>
       
    </div>
  );
};

export default UserProfilePage;