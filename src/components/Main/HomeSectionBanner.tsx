"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "./main.css"

const HomeSlider = () => {
  return (
    <section className="home-slider-section">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="home-slider"
      >
        <SwiperSlide>
          <div
            className="home-banner-items"
            style={{
              backgroundImage:
                "url(https://bookingtour.vn/templates/themes/images/slider-banner-1.jpg?v3)",
            }}
          >
            <div className="banner-content-wrap">
              <div className="container">
                <div className="banner-content text-center">
                  <h2 className="banner-title">BẠN ĐANG MUỐN ĐI ĐÂU?</h2>
                  <p>Hãy để BookingTour tư vấn cho bạn chuyến đi tuyệt vời nhất!</p>
                  <a href="https://bookingtour.vn/destination" className="button-primary">
                    XEM TIẾP
                  </a>
                </div>
              </div>

            </div>
            <div className="overlay"></div>

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="home-banner-items"
            style={{
              backgroundImage:
                "url(https://bookingtour.vn/templates/themes/images/slider-banner-2.jpg?v3)",
            }}
          >
            <div className="banner-content-wrap">
              <div className="container">
                <div className="banner-content text-center">
                  <h2 className="banner-title">EXPERIENCE THE NATURE'S BEAUTY</h2>
                  <p>
                    Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic
                    proident ullam, eaque donec delectus tempor consectetur nunc.
                  </p>
                  <a href="https://bookingtour.vn/destination" className="button-primary">
                    CONTINUE READING
                  </a>
                </div>
              </div>
            </div>

            <div className="overlay"></div>

          </div>
        </SwiperSlide>
      </Swiper>


    </section>
  );
};

export default HomeSlider;
