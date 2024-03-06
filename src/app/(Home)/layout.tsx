import { Header } from '@/components/Header/Header';
import styles from './layout.module.scss';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.homeLayout}>
      {/* <Header /> */}
      <main>{children}</main>
    </div>
  );
}
