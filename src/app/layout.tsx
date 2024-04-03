import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';
import '../styles/variables.scss';

import clsx from 'clsx';
import { Bellefair } from 'next/font/google';

export const metadata = {
  title: 'Az Elme Ereje',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Az Elme Ereje',
    description:
      'Hogyan teremtsd meg saját sikered gondolataiddal és szokásaiddal?',
    url: 'https://elmeereje.hu',
    siteName: 'Az Elme Ereje',
    images: [
      {
        url: 'https://elmeereje.hu/api/og',
        width: 1024,
        height: 1024,
      },
    ],
    locale: 'en_HU',
    type: 'website',
  },
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
