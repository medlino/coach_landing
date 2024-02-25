'use client';

import { Button } from '../../Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './TestimonialSection.module.scss';

const testimonials = [
  {
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export const TestimonialSection = () => {
  return (
    <section className={styles.testimonialSection}>
      <h1>Testimonials</h1>
      <div
        style={{
          maxWidth: '1000px',
          marginTop: '30px',
          marginBottom: '50px',
        }}
      >
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={false}
          initialSlide={2}
          slidesPerView={3}
          spaceBetween={0}
          loop={true}
          coverflowEffect={{
            rotate: 10,
            stretch: 10,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Pagination]}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  padding: '2rem',
                  background: 'white',
                  borderRadius: '1rem',
                  border: '1px solid black',
                  boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.1)',
                  maxWidth: '300px',
                }}
              >
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Button text="CSATLAKOZOM" />
    </section>
  );
};
