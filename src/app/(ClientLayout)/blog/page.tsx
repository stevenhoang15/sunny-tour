"use client"

import HomeSlider from "@/components/Main/HomeSectionBanner";
import TourSidebar from "./TourSidebar";
import TourContentent from "./TourContent";

const Page = () => {
    return <>
        <HomeSlider />

        <div>
        <TourContentent />
        <TourSidebar />

        </div>

    </>
}


export default Page;    