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
  FreeContentSection,
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
      <FreeContentSection />
      <BundleSection />
      <TestimonialSection />
      <AssuranceSection />
      <HelpSection />
    </main>
  );
}
