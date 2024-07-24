import { HeroSection } from '@/components/Sections/LandingSections/HeroSection/HeroSection';
import { SelectorSection } from '@/components/Sections/LandingSections/SelectorSection/SelectorSection';
import { AboutProgSection } from '@/components/Sections/LandingSections/AboutProgSection/AboutProgSection';
import { BundleSection } from '@/components/Sections/LandingSections/BundleSection/BundleSection';
import { HelpSection } from '@/components/Sections/LandingSections/HelpSection/HelpSection';
import { TestimonialSection } from '@/components/Sections/LandingSections/TestimonialSection/TestimonialSection';
import { WhyDifferentSection } from '@/components/Sections/LandingSections/WhyDifferentSection/WhyDifferentSection';

import styles from './page.module.scss';

export default async function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <AboutProgSection />
      <SelectorSection />
      <WhyDifferentSection />
      <BundleSection />
      <TestimonialSection />
      <HelpSection />
    </main>
  );
}
