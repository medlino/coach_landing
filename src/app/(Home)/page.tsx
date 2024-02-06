import {
  HeroSection,
  TestimonialSection,
  WhyUsSection,
} from '@/components/Sections';

import { Footer } from '@/components/Footer/Footer';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <WhyUsSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}
