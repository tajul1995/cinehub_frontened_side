import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/navbar1";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   <Navbar></Navbar>
   {children}
   <Footer></Footer>
   </>
  );
}