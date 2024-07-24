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
  SelectorSection,
  WhyDifferent,
} from '@/components/Sections';

import styles from './page.module.scss';

export default async function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <AboutProgSection />
      <SelectorSection />
      <WhyDifferent />
      <BundleSection />
      <TestimonialSection />
      <HelpSection />
    </main>
  );
}
