'use client';

import { useTranslation } from '@/app/i18n/client';
import styles from './Cart.module.css';
import { useCart } from '@/contexts/cartContext';
import Link from 'next/link';

export default function Cart({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'Cart');
  const total = useCart().length;

  if (total === 0) {
    return null;
  }

  return (
    <section className={styles.cartContainer} id="cart">
      <div className={styles.container}>
        <div>
          <h3>{t('cart')}</h3>
          <span>{t('counter', { count: total })}</span>
        </div>
        <Link href={`/${lng}/order`}>
          <button className={styles.button}>
            <span className={styles.buttonText}>{t('send')}</span>
          </button>
        </Link>
      </div>
    </section>
  );
}
