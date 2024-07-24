import { RelaxHeroSection } from '@/components/Sections/RelaxSections/HeroSection/HeroSection';
import { HeroPromoSection } from '@/components/Sections/RelaxSections/HeroPromoSection/HeroPromoSection';
import { WhyParticipateSection } from '@/components/Sections/RelaxSections/WhyParticipateSection/WhyParticipateSection';
import { HowItHelpsSection } from '@/components/Sections/RelaxSections/HowItHelpSection/HowItHelpsSection';

import styles from './page.module.scss';

export default async function Relax() {
  return (
    <main className={styles.main}>
      <RelaxHeroSection />
      <HeroPromoSection />
      <WhyParticipateSection />
      <HowItHelpsSection />
    </main>
  );
}
