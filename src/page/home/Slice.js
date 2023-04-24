import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useResize from "../../hooks/useResize";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
const arr = [
  {
    image: "https://wallpaper.dog/large/1007600.jpg",
  },
  {
    image: "https://wallpaper.dog/large/1007776.jpg",
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
