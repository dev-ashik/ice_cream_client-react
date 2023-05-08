import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { carousel_1, carousel_2, carousel_3 } from "../../assets";
import Skeleton from "react-loading-skeleton";

const carousel_data = [
  {
    id: 1,
    header: "Try our signature flavor",
    description:
      "Our Salted Caramel Swirl is a perfect balance of sweet and salty, with creamy caramel ice cream swirled with ribbons of rich salted caramel sauce.",
    img: carousel_1,
  },
  {
    id: 2,
    header: "Satisfy your sweet tooth",
    description:
      "Our Chocolate Fudge Brownie is a chocolate lover's dream come true. Rich chocolate ice cream is loaded with chunks of fudgy brownie pieces",
    img: carousel_2,
  },
  {
    id: 3,
    header: "Cool off with our refreshing",
    description:
      "Looking for a lighter treat that still packs a punch of flavor? Our Raspberry Sorbet is the perfect choice. Made with real raspberries, this sorbet is tangy",
    img: carousel_3,
  },
];

const Carousel = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {carousel_data.map((item) => (
          <SwiperSlide key={item.id} className="carousel">
            <div className="carousel_text">
              
              <h1>{item.header}</h1>
              <p>{item.description}</p>
              {/* <button className="button_primary">Order Now</button> */}
            </div>
            <div className="carousel_img">
              <img src={item.img} alt="image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
