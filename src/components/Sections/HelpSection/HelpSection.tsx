import styles from './HelpSection.module.scss';

export const HelpSection = () => {
  return (
    <section id="segitseg" className={styles.helpSection}>
      <p className={styles.help}>
        Amennyiben problémád merült fel a vásárlással, az aktiválással vagy a
        tartalom elérésével kapcsolatban, kérjük írjon egy e-mailt az{' '}
        <span style={{ textDecoration: 'underline' }}>info@medlino.hu-ra.</span>
      </p>
    </section>
  );
};
