import {
  HeroSection,
  TestimonialSection,
  WhyUsSection,
  WhatInProgSection,
  AboutProgSection,
  BundleSection,
} from '@/components/Sections';
import { Footer } from '@/components/Footer/Footer';

import styles from './page.module.scss';

export default async function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <AboutProgSection />
      <WhyUsSection />
      <WhatInProgSection />
      <BundleSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}
