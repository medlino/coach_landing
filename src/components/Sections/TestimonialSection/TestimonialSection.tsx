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
    name: 'Kecze Zsófia',
    title: 'Művészeti menedzser, kurátor',
    img: '/zs_test.png',
    desc: 'Szeretettel ajánlom ezt a programot azoknak, akik készek arra, hogy lépéseket tegyenek valódi önmaguk megismerése felé. Azoknak, akik elkezdtek feltenni maguknak nehéz kérdéseket, azoknak, akik ezekre keresik a válaszokat, és alig várják, hogy rátaláljanak. Sokszor nagyon nehéz, sokszor nagyon megpróbáltató, de annál izgalmasabb és kifizetődőbb. Köszönöm Nektek, hogy a program segítségével nyerhettem bizonyosságot arról, hogy képes vagyok a változásra és a változtatásra.',
  },
  {
    name: 'Brezowski Péter',
    title: 'Mérnök, masszázs terapeuta',
    img: '/b_test.jpg',
    desc: 'Régóta küszködtem azzal, hogy felelősséget vállaljak, meghúzzam a határaimat, és a saját akarom szerint alakítsam az életemet. A tudás, amit kaptam és a gyakorlatba helyezett szokások, amiket kialakítottam ráébresztett egy belső erőre. Elkezdtem a kezembe venni a saját életem irányítását és legyőzni a belső gátakat ezáltal a külső gátak is ledőltek a környezetemben, pont, ahogy mondtátok. Köszönöm!',
  },
  {
    name: 'Nagy Tamás',
    title: 'IT Projekt Manager',
    img: '/t_test.png',
    desc: 'Annyi mindent tanultam az agy működéséről! Ez tényleg segített megérteni, hogy miként befolyásolják a gondolataim az életemet. Ez egy hatalmas dolog volt számomra, amiért először is nagyon hálás vagyok. De nem álltam meg itt! Megtanultam pár trükköt, szokást, hogy újraformáljam az agyamat. Ez segített abban, hogy jobban boldoguljak a munkahelyemen és más területeken is az életemben.',
  },
  {
    name: 'Kecze Zsófia',
    title: 'Művészeti menedzser, kurátor',
    img: '/zs_test.png',
    desc: 'Szeretettel ajánlom ezt a programot azoknak, akik készek arra, hogy lépéseket tegyenek valódi önmaguk megismerése felé. Azoknak, akik elkezdtek feltenni maguknak nehéz kérdéseket, azoknak, akik ezekre keresik a válaszokat, és alig várják, hogy rátaláljanak. Sokszor nagyon nehéz, sokszor nagyon megpróbáltató, de annál izgalmasabb és kifizetődőbb. Köszönöm Nektek, hogy a program segítségével nyerhettem bizonyosságot arról, hogy képes vagyok a változásra és a változtatásra.',
  },
  {
    name: 'Brezowski Péter',
    title: 'Mérnök, masszázs terapeuta',
    img: '/b_test.jpg',
    desc: 'Régóta küszködtem azzal, hogy felelősséget vállaljak, meghúzzam a határaimat, és a saját akarom szerint alakítsam az életemet. A tudás, amit kaptam és a gyakorlatba helyezett szokások, amiket kialakítottam ráébresztett egy belső erőre. Elkezdtem a kezembe venni a saját életem irányítását és legyőzni a belső gátakat ezáltal a külső gátak is ledőltek a környezetemben, pont, ahogy mondtátok. Köszönöm!',
  },
  {
    name: 'Nagy Tamás',
    title: 'IT Projekt Manager',
    img: '/t_test.png',
    desc: 'Annyi mindent tanultam az agy működéséről! Ez tényleg segített megérteni, hogy miként befolyásolják a gondolataim az életemet. Ez egy hatalmas dolog volt számomra, amiért először is nagyon hálás vagyok. De nem álltam meg itt! Megtanultam pár trükköt, szokást, hogy újraformáljam az agyamat. Ez segített abban, hogy jobban boldoguljak a munkahelyemen és más területeken is az életemben.',
  },
];

export const TestimonialSection = () => {
  return (
    <section className={styles.testimonialSection}>
      <h1>Rólunk mondtátok</h1>
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
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '2rem',
                  background: 'white',
                  borderRadius: '1rem',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  maxWidth: '500px',
                }}
              >
                <div
                  style={{
                    margin: 'auto',
                    width: '150px',
                    height: '150px',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '50%',
                  }}
                >
                  <img
                    src={t.img}
                    style={{
                      width: '100%',
                      height: 'auto',
                      position: 'absolute',
                      top: '0',
                    }}
                  />
                </div>
                <h3
                  style={{ marginBottom: '0px', fontWeight: 400, fontSize: 32 }}
                >
                  {t.name}
                </h3>
                <h4
                  style={{
                    marginBottom: '0px',
                    marginTop: '8px',
                    fontWeight: 400,
                    fontSize: 26,
                  }}
                >
                  {t.title}
                </h4>
                <p style={{ fontSize: 20 }}>{t.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Button text="CSATLAKOZOM" />
    </section>
  );
};
