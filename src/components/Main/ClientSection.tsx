"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from "swiper/modules";

const clientLogos = [
  "https://bookingtour.vn/templates/themes/images/logo1.png",
  "https://bookingtour.vn/templates/themes/images/logo2.png",
  "https://bookingtour.vn/templates/themes/images/logo3.png",
  "https://bookingtour.vn/templates/themes/images/logo4.png",
  "https://bookingtour.vn/templates/themes/images/logo5.png",
];

const ClientSection = () => {
  return (
    <div className="client-section py-10 bg-gray-100">
      <div className="container mx-auto">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          freeMode={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          modules={[FreeMode, Autoplay]}
          className="client-slider"
        >
          {clientLogos.map((logo, index) => (
            <SwiperSlide key={index} className="client-item flex justify-center">
              <img src={logo} alt={`Client ${index + 1}`} className="w-40" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientSection;
