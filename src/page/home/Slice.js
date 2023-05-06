import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useResize from "../../hooks/useResize";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
const arr = [
  {
    image:
      "https://c0.wallpaperflare.com/preview/887/755/625/greyscale-photography-of-person.jpg",
  },
  {
    image:
      "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/iwonsgljelulg4pu9t7x/fog?fimg-ssr-default",
  },
  {
    image:
      "https://cutewallpaper.org/21/fear-of-god-wallpapers/Jerry-Lorenzo-X-Nike-Collection-Nike-Fear-Of-God-Hd-.jpg",
  },
];

export default function Slice() {
  const size = useResize();

  return (
    <>
      {size.with > 768 ? (
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src={arr[0].image}
              style={{ width: "100%", height: "100vh" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={arr[1].image}
              style={{ width: "100%", height: "100vh" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={arr[2].image}
              style={{ width: "100%", height: "100vh" }}
            />
          </SwiperSlide>
        </Swiper>
      ) : (
        <img src={arr[0].image} style={{ width: "100%", height: "30vh" }} />
      )}
    </>
  );
}
