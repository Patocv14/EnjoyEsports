import React from "react";
import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Autoplay } from "swiper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderApi from "../../jsons/slider.json";

import Image from "next/image";

const Clafisifaciones = () => {
  const [images, setImages] = useState([]);
  console.log(images);

  useEffect(() => {
    try {
      setImages(sliderApi);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2.8,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    speed: 30000,
    autoplaySpeed: 0,
    initialSlide: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 0.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-10">
      <div>
        <div className="text-center font-bold uppercase">
          <h1 className="md:text-5xl text-3xl fuenteEnjoy">
            College Collision 2023
          </h1>
          <h1 className="md:text-4xl text-2xl pt-2 text-rojo fuenteEnjoy">
            Clasificaciones
          </h1>
        </div>

        <Slider className="cursor-pointer" {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <p className="text-center xl:text-5xl text-xl mt-5 text-black fuenteEnjoy">
                {image.text}
              </p>
              <div className="flex justify-center py-5 autoImagen">
                <Image
                  src={image.image}
                  alt={image.alt}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Clafisifaciones;
