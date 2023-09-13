import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';

const openSans = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Space Rock Blocker',
  description: 'Block unwanted space rocks',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
