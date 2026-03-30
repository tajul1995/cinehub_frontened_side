import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { getUserInfo } from "@/service/auth.service";



export default async function DashboardLayout({
  admin,
  user,
}: {
  children: React.ReactNode;
   admin: React.ReactNode;
  user: React.ReactNode;
}) {
   const  data = await getUserInfo();
   console.log(data)

   const userInfo = data?.role;
   
   console.log(userInfo)
// const userInfo = { role: Roles.admin }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo===Roles.admin ? admin : user}
          
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}