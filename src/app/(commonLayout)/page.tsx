import BannerCarousel from "@/components/home/Banner";
import MovieSlider from "@/components/home/MovieSlider";
import PopularGallery from "@/components/home/PopularGallery";


export default function Home() {
  return (
    <div className="lg:max-w-7xl overflow-x-hidden lg:mx-auto">
     <BannerCarousel></BannerCarousel>
     <PopularGallery></PopularGallery>
      <MovieSlider></MovieSlider>
    </div>
  );
}