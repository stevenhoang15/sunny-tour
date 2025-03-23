import Footer from "@/components/Footer/page";
import FormSearch from "@/components/FormSearch/page";
import Header from "@/components/Header/page";
import BestGallerySection from "@/components/Main/BestGallerySection";
import BlogSection from "@/components/Main/BlogSection";
import ClientSection from "@/components/Main/ClientSection";
import DestinationSection from "@/components/Main/DestinationSection";
import HomeSlider from "@/components/Main/HomeSectionBanner";
import PackageSection from "@/components/Main/PackageSection";

export default function Home() {
  return (
    <div>
      <HomeSlider />
    <div>
      <FormSearch />
      <DestinationSection /> 
      <PackageSection />
      <BestGallerySection />
      <ClientSection />
      <BlogSection /> 
    </div>
    
    </div>
    
  );
}
