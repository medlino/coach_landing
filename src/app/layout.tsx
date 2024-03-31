import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';
import '../styles/variables.scss';

import clsx from 'clsx';
import { Bellefair } from 'next/font/google';

export const metadata = {
  title: 'Medlino',
};

const bellefair = Bellefair({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bellefair',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hun" className={clsx(bellefair.variable)}>
      <body>{children}</body>
    </html>
  );
}
