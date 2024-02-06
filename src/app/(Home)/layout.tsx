import styles from './layout.module.scss';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.homeLayout}>
      <main>{children}</main>
    </div>
  );
}
