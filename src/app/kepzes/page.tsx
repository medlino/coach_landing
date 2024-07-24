import { AboutCourseSection } from '@/components/Sections/CourseSections/AboutCourseSection/AboutCourseSection';
import { WhatInProgSection } from '@/components/Sections/CourseSections/WhatInProgSection/WhatInProgSection';

import styles from './page.module.scss';

export default async function Course() {
  return (
    <main className={styles.main}>
      <AboutCourseSection />
      <WhatInProgSection />
    </main>
  );
}
