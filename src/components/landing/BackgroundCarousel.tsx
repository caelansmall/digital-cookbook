import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import cooking0 from '/cooking0.jpg';
import cooking1 from '/cooking1.jpg';
import cooking2 from '/cooking2.jpg';
import cooking3 from '/cooking3.jpg';
import cooking4 from '/cooking4.jpg';
import cooking5 from '/cooking5.jpg';
import cooking6 from '/cooking6.jpg';
import cooking7 from '/cooking7.jpg';
import cooking8 from '/cooking8.jpg';
import cooking9 from '/cooking9.jpg';

const BackgroundCarousel = () => {
  const images = [
    cooking0,
    cooking1,
    cooking2,
    cooking3,
    cooking4,
    cooking5,
    cooking6,
    cooking7,
    cooking8,
    cooking9
  ];

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
        }}
        loop={true}
        speed={7500}
        spaceBetween={15}
        slidesPerView={1.8}
        centeredSlides={true}
        allowTouchMove={false}
        simulateTouch={false}
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BackgroundCarousel;
