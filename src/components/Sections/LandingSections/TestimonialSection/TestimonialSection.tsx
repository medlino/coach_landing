'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './TestimonialSection.module.scss';

const testimonials = [
  {
    name: 'Kiss Bence',
    title: 'Többszörös magyar street workout bajnok, online vállalkozó',
    img: '/testimonials/be_test.png',
    desc: 'A sport kapcsán találkoztam először a teremtéssel és a gondolkodásmóddal, viszont ilyen megközelítésben még nem hallottam sehol. A tudás amilyen gyakorlatiasan és strukturáltan össze van szedve rendkívül fogyasztható és rengeteget segített nekem a mindennapi életben. Hálásan köszönöm a srácoknak!',
  },
  {
    name: 'Brezowski Péter',
    title: 'Masszázs terapeuta',
    img: '/testimonials/b_test.jpg',
    desc: 'Véleményem szerint ez egy teljes értékű program, két jól informált, segítőkész fiatal felnőtt előadásában. Bátran ajánlom mindenkinek: a kihívást és célokat keresőknek, a gyógyulni és fejlődni vágyóknak. Testi, szellemi, lelki szinten egyaránt. A tudás, amit kaptam és a gyakorlatba helyezett szokások, amiket kialakítottam ráébresztettek egy belső erőre. Köszönöm nektek!',
  },
  {
    name: 'Nagy Tamás',
    title: 'IT Project Manager',
    img: '/testimonials/t_test.png',
    desc: 'Rengeteget tanultam az agy működéséről, ami segített megérteni, hogy miként befolyásolják a gondolataim az életemet. Ez egy hatalmas dolog volt számomra, amiért először is nagyon hálás vagyok nektek srácok. Megtanultam pár trükköt, szokást, hogy újra formáljam a tudatomat. Ez segített abban, hogy jobban boldoguljak a munkahelyemen és az életem összes többi területén is.',
  },
  {
    name: 'Kovács Gergely',
    title: 'Brandomenal Media Ügyvezető',
    img: '/testimonials/g_test.png',
    desc: 'Mindig is érdekelt a spiritualitás, a manifesztáció, a vonzás törvénye és sok mindent hallottam már ezekkel kapcsolatban de ilyen modern megközelítést és ilyen tudományos alátámasztást még nem, ami nagyon hitelessé tette számomra a tanultakat. Pezsgős hangulatú a képzés, a srácok jól tartják a figyelmet, emiatt élvezettel tanultam végig.',
  },
  {
    name: 'Tálas Balázs',
    title: 'Multimilliomos online vállalkozó',
    img: '/testimonials/ba_test.png',
    desc: 'Nem is gondoltam volna, hogy ha elkezdem megfigyelni gondolataim mennyi negativ gondolatom van egy nap és ezek hogy felül tudnak kerekedni rajtam. A srácok ráébresztettek arra, hogy mennyire fontos megfigyelnem a gondolataimat és tudatosítanom, valamit átprogramoznom őket így egy sokkal pozitívabb hétköznapi életet teremtsek magamnak ami minden más sikeremhez is hozzájárult. Nagyon sokat segített nekem ebben Younes és Kristóf amiért hálás vagyok.',
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
  return (
    <section id="velemenyek" className={styles.testimonialSection}>
      <h1>Rólunk mondtátok</h1>
      <div className={styles.swiperContainer}>
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
    </section>
  );
};
