import { AboutCommunitySection } from '@/components/Sections/CommunitySections/AboutCommunitySection/AboutCommunitySection';
import { HowItFormsSection } from '@/components/Sections/CommunitySections/HowItFormsSection/HowItFormsSection';

import styles from './page.module.scss';

export default async function Community() {
  return (
    <main className={styles.main}>
      <AboutCommunitySection />
      <HowItFormsSection />
    </main>
  );
}
