'use client';

import { useSyncExternalStore } from 'react';
import { useTranslation } from '@/app/i18n/client';
import styles from './OrderButton.module.css';
import {
  CartActionKind,
  useCart,
  useCartDispatch,
} from '@/contexts/cartContext';
import { AsteroidShort } from '../AsteroidEntry/AsteroidEntry';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function OrderButton({
  lng,
  item,
}: {
  lng: string;
  item: AsteroidShort;
}) {
  const isHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const { t } = useTranslation(lng, 'AsteroidEntry');
  const dispatch = useCartDispatch();
  const isOrdered = useCart().some((e) => e.id === item.id);

  return (
    <button
      className={styles.orderButton}
      disabled={!isHydrated}
      onClick={() => {
        dispatch({
          type: isOrdered ? CartActionKind.DELETED : CartActionKind.ADDED,
          payload: item,
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
