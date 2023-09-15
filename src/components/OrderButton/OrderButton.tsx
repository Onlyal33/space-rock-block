'use client';

import { useTranslation } from '@/app/i18n/client';
import styles from './OrderButton.module.css';
import {
  CartActionKind,
  useCart,
  useCartDispatch,
} from '@/contexts/cartContext';

export default function OrderButton({ lng, id }: { lng: string; id: number }) {
  const { t } = useTranslation(lng, 'AsteroidEntry');
  const dispatch = useCartDispatch();
  const isOrdered = useCart().includes(id);

  return (
    <button
      className={styles.orderButton}
      onClick={() => {
        dispatch({
          type: isOrdered ? CartActionKind.DELETED : CartActionKind.ADDED,
          payload: id,
        });
      }}
    >
      {isOrdered ? (
        <span className={styles.orderedText}>{t('inCart')}</span>
      ) : (
        <span className={styles.unorderedText}>{t('order')}</span>
      )}
    </button>
  );
}
