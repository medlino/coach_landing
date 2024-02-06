'use client';

import { Button } from '../../Button';
import styles from './TestimonialSection.module.scss';

export const TestimonialSection = () => {
  return (
    <section className={styles.testimonialSection}>
      <h1>Testimonials</h1>
      <div className={styles.testimonial}>
        <p>"I love the product!"</p>
        <h4>John Doe</h4>
      </div>
      <div className={styles.testimonial}>
        <p>"I love the product!"</p>
        <h4>John Doe</h4>
      </div>
      <div className={styles.testimonial}>
        <p>"I love the product!"</p>
        <h4>John Doe</h4>
      </div>
      <Button text="READ MORE" />
    </section>
  );
};
