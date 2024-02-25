import {
  HeroSection,
  TestimonialSection,
  WhyUsSection,
} from '@/components/Sections';

import { Footer } from '@/components/Footer/Footer';

import styles from './page.module.scss';
import { AboutProgSection } from '@/components/Sections/AboutProgSection/AboutProgSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutProgSection />
      <WhyUsSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
