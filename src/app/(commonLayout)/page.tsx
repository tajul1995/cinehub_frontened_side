import BannerCarousel from "@/components/home/Banner";
import PopularGallery from "@/components/home/PopularGallery";


export default function Home() {
  return (
    <div className="max-w-7xl overflow-x-hidden mx-auto">
     <BannerCarousel></BannerCarousel>
     <PopularGallery></PopularGallery>
    </div>
  );
}