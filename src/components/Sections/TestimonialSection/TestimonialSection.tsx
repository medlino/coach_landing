'use client';

import { Button } from '../../Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

<<<<<<< Updated upstream
=======
import { stripeCheckout } from '@/clientAPI/checkout';
>>>>>>> Stashed changes
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getBreakpoints } from '@/styles/breakpoints';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './TestimonialSection.module.scss';

const testimonials = [
  {
    name: 'Kiss Bence',
    title:
      '3x-os magyar street workout bajnok, vállalkozó, online marketing ügynokség CEO',
    img: '/testimonials/be_test.png',
    desc: 'A sport kapcsán találkoztam előszür a teremtéssel  és a gondolkodásmóddal és gyakoroltam tanultam is de mindig is szerettem ezekben a témákban tanulni, uj információt gyűjteni így ugy dontottem hogy csatlakozom a programhoz. Ilyen megközlítésben még nem hallottam sehol tudást ebben a témakörben és amilyen gyakorlatiasan és struktúráltan össze van szedve rendkívül fogyasztható és rengeteget segített nekem a mindennapi életben. Hálásan köszönöm a srácoknak!',
  },
  {
    name: 'Brezowski Péter',
    title: 'Mérnök, masszázs terapeuta',
    img: '/testimonials/b_test.jpg',
    desc: 'Régóta küszködtem azzal, hogy felelősséget vállaljak, meghúzzam a határaimat, és a saját akarom szerint alakítsam az életemet. A tudás, amit kaptam és a gyakorlatba helyezett szokások, amiket kialakítottam ráébresztett egy belső erőre. Elkezdtem a kezembe venni a saját életem irányítását és legyőzni a belső gátakat ezáltal a külső gátak is ledőltek a környezetemben, pont, ahogy mondtátok. Köszönöm!',
  },
  {
    name: 'Nagy Tamás',
    title: 'IT Projekt Manager',
    img: '/testimonials/t_test.png',
    desc: 'Annyi mindent tanultam az agy működéséről! Ez tényleg segített megérteni, hogy miként befolyásolják a gondolataim az életemet. Ez egy hatalmas dolog volt számomra, amiért először is nagyon hálás vagyok. De nem álltam meg itt! Megtanultam pár trükköt, szokást, hogy újraformáljam az agyamat. Ez segített abban, hogy jobban boldoguljak a munkahelyemen és más területeken is az életemben.',
  },

  {
    name: 'Kecze Zsófia',
    title: 'Művészeti menedzser, kurátor',
    img: '/testimonials/zs_test.png',
    desc: 'Szeretettel ajánlom ezt a programot azoknak, akik készek arra, hogy lépéseket tegyenek valódi önmaguk megismerése felé. Azoknak, akik elkezdtek feltenni maguknak nehéz kérdéseket, azoknak, akik ezekre keresik a válaszokat, és alig várják, hogy rátaláljanak. Sokszor nagyon nehéz, sokszor nagyon megpróbáltató, de annál izgalmasabb és kifizetődőbb. Köszönöm Nektek, hogy a program segítségével nyerhettem bizonyosságot arról, hogy képes vagyok a változásra és a változtatásra.',
  },
  {
    name: 'Kovács Gergely',
    title: 'Brandomenal Media CEO, GEM CEO ',
    img: '/testimonials/g_test.png',
    desc: 'Mindig is érdekelt a spiritualitás, manifesztáció vonzzás törvénye és sokmindent hallottam már ezekkel kapcsolatban de ilyen modern megközelítést és ilyen tudományos alátámasztást még nem ami nagyon hitelessé tette számomra  a programot. Nem is gonodltam volna azt hogy a ezek a fizikai szokások mennyire meg tudják erősíteni az elmémet és a többi mentális gyakorlat is ki tud teljesedni ez által. Felnyitották a szemem a srácok.',
  },
  {
    name: 'Tálas Balázs',
    title: 'Multimilliomos online vállalkozó',
    img: '/testimonials/ba_test.png',
    desc: 'Nem is gondoltam volna hogy ha elkezdem megfigyelni gondolataim mennyi negativ gondolatom van egy nap és ezek hogy felul tudnak kerekedni rajtam. A program ráébresztett arra hogy mennyire fontos hogy megfigyeljük a gondolatainkat és tudatposítsuk, valamit átprogramozzuk őket így egy sokkal pozitívabb hétköznapi életet teremtsek magamnak ami minden más sikeremhez is hozzájárult. Nagyon sokat segített nekem ebben Younes és Kristóf amiért hálás vagyok.',
  },
];

const multipleTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export const TestimonialSection = () => {
  const isSmallDevice = useMediaQuery(
    `only screen and ${getBreakpoints().maxSm}`
  );

  return (
    <section className={styles.testimonialSection}>
      <h1>Rólunk mondtátok</h1>
      <div
        style={{
          maxWidth: '1000px',
          marginTop: isSmallDevice ? '5px' : '30px',
          marginBottom: isSmallDevice ? '5px' : '50px',
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
          {multipleTestimonials.map((t, i) => (
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

      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
