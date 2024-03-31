import {
  HeroSection,
  TestimonialSection,
  WhyUsSection,
  WhatInProgSection,
  AboutProgSection,
} from '@/components/Sections';
import { Footer } from '@/components/Footer/Footer';

import styles from './page.module.scss';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <AboutProgSection />
      <WhyUsSection />
      <WhatInProgSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
