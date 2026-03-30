"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,

} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

//  import { authClient } from "@/lib/auth-client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/service/auth.service";



interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    // provider: {
    //   title: string;
    //   url: string;
    // };
    signout: {
      title: string;
      
    };
  };
}

// "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"

const Navbar = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src:"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "cinehub",
  },
  menu = [
    { title: "Home", url: "/" },
    
    {
      title: "movies",
      url: "/movies",
    },
    {
      title: "payment",
      url: "/payment",
    },{
      title: "DASHBOARD",
      url: "/dashboard",
    }
    // {
    //   title: "menudatiles",
    //   url: "/menudatiles",
    // },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
    // provider: { title: "provider", url: "/provider" },
    signout: { title: "signout" },
  },
  className,
}: Navbar1Props) => {
  

  const [session, setSession] = useState(null);
  // const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchData = async () => {
    const res = await getUserInfo()
    setSession(res)
    console.log(res)
    // try {
    //   const res = await fetch("http://localhost:5000/api/v1/auth/me", {
    //     credentials: "include",
    //   });

    //   const result = await res.json();
    //   console.log("navbar",result)

    //   if (result.ok) {
    //     setSession(result); // or result.data depending API
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    // const res=await getUserInfo()
    // setSession(res)
  };

  fetchData();
}, []);


    
// if(loading) return <div>Loading...</div>
  console.log(session)
  //  const session1 = authClient.useSession()
  //   // console.log(session.data?.user.id)
  // // const userId =session.data?.user.id
  // console.log("session",session1)

// const router=useRouter()
const handleTosignOut = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("Logout failed");

    setSession(null); // 🔥 FIX UI instantly
   
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  return (
    <section className={cn("py-4", className)}>
      <div className="container max-w-7xl mx-auto p-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            {
              session?
                  <>
                    <Button  onClick={()=>handleTosignOut()}>
                      signout
                    </Button>
                    
                  </>
                  
                  :<>
                      <Button asChild variant="outline">

                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                    </>
                }
            {/* <Button onClick={()=>handleTosignOut()}>
              signout
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
            
            {session.data?.user&&<Button asChild size="sm">
              <Link href={auth.provider.url}>{auth.provider.title}</Link>
            </Button>} */}
            
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                {
                  session?
                  <>
                    <Button  onClick={()=>handleTosignOut()}>
                      signout
                    </Button>
                    
                  </>
                  
                  :<>
                      <Button asChild variant="outline">

                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                    </>
                }


                   
                    {/* <Button asChild variant="outline">

                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                    
                    {session.data?.user&&<Button asChild size="sm">
              <Link href={auth.provider.url}>{auth.provider.title}</Link>
            </Button>} */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild
       
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
      <Link  href={item.url}>{item.title}</Link>     
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };