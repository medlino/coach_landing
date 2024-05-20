import {
  AssuranceSection,
  HeroSection,
  TestimonialSection,
  WhyUsSection,
  WhatInProgSection,
  AboutProgSection,
  BundleSection,
} from '@/components/Sections';

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
      <AssuranceSection />
    </main>
  );
}
