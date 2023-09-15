import './globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import Header from '@/components/Header/Header';
import CartProvider from '@/contexts/cartContext';
import { languages } from '../i18n/settings';
import { openSans } from './fonts';

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
      <body className={openSans.className}>
        <Header lng={lng} />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
