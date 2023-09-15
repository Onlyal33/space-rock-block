import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import { dir } from 'i18next';
import Cart from '@/components/Cart/Cart';
import Header from '@/components/Header/Header';
import CartProvider from '@/contexts/cartContext';
import { languages } from '../i18n/settings';
import earth from '../../../public/earth.webp';
import { openSans } from './fonts';
import styles from './layout.module.css';

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
        <CartProvider>
          <main className={styles.main}>
            <div className={styles.earthAndFeedContainer}>
              <Image
                src={earth}
                alt="Earth from space"
                className={styles.earth}
                priority
              />
              {children}
            </div>
            <Cart lng={lng} />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
