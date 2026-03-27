import Footer from "@/components/layout/footer";
import { Navbar1 } from "@/components/navbar1";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   <Navbar1></Navbar1>
   {children}
   <Footer></Footer>
   </>
  );
}