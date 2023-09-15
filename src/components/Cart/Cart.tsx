'use client';

import { useTranslation } from '@/app/i18n/client';
import styles from './Cart.module.css';
import {
  CartActionKind,
  useCart,
  useCartDispatch,
} from '@/contexts/cartContext';

export default function Cart({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'Cart');
  const dispatch = useCartDispatch();
  const total = useCart().length;

  if (total === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div>
        <h3>{t('cart')}</h3>
        <span>{t('counter', { count: total })}</span>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          dispatch({
            type: CartActionKind.SENT,
            payload: 0,
          });
        }}
      >
        <span className={styles.buttonText}>{t('send')}</span>
      </button>
    </div>
  );
}
