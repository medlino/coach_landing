import {
  AssuranceSection,
  HeroSection,
  TestimonialSection,
  WhyUsSection,
  WhatInProgSection,
  AboutProgSection,
  AboutCommunitySection,
  BundleSection,
  HelpSection,
} from '@/components/Sections';

import styles from './page.module.scss';

export default async function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <AboutProgSection />
      <WhyUsSection />
      <WhatInProgSection />
      <AboutCommunitySection />
      <BundleSection />
      <TestimonialSection />
      <AssuranceSection />
      <HelpSection />
    </main>
  );
}
