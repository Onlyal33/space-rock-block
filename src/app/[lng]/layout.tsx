import './globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header/Header';
import { languages } from '../i18n/settings';
import { openSans } from './fonts';
import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Space Rock Blocker',
  description: 'Block unwanted space rocks',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    lng: string;
  }>;
}) {
  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={openSans.className}>
        <Header lng={lng} />
        <Providers lng={lng}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
