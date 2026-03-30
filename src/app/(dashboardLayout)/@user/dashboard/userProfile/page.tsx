

import ProfileCard from "@/components/dashboardCollection/userProfile";
import { getUserInfo } from "@/service/auth.service";

const UserProfilePage = async () => {
 
  const res = await getUserInfo()
      
      console.log(res,"res from user profile page")

  return (
    <div>
       <ProfileCard user={res} /> 
    </div>
  );
};

export default UserProfilePage;