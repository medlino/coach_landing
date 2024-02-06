import '../styles/globals.scss';

export const metadata = {
  title: 'Medlino',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hun">
      <body>{children}</body>
    </html>
  );
}
