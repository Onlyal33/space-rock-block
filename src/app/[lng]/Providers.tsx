'use client';

import { CookiesProvider } from 'react-cookie';
import Cart from '@/components/Cart/Cart';
import CartProvider from '@/contexts/cartContext';
import styles from './layout.module.css';

export default function Providers({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  return (
    <CookiesProvider>
      <CartProvider>
        <main className={styles.main}>
          <div className={styles.earthAndFeedContainer}>
            <div className={styles.earth} />
            {children}
          </div>
          <Cart lng={lng} />
        </main>
      </CartProvider>
    </CookiesProvider>
  );
}
