'use client';

import { useEffect, useState } from 'react';
import AsteroidEntry from '@/components/AsteroidEntry/AsteroidEntry';
import {
  CartActionKind,
  useCart,
  useCartDispatch,
} from '@/contexts/cartContext';

export default function OrderItems({ lng }: { lng: string }) {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const [sent] = useState([...cart]);

  useEffect(() => {
    dispatch({
      type: CartActionKind.SENT,
      payload: null,
    });
  }, [dispatch]);

  return (
    <>
      {sent.map((asteroid, idx) => (
        <AsteroidEntry
          key={`${idx}-${asteroid.id}`}
          item={asteroid}
          lng={lng}
          cart
        />
      ))}
    </>
  );
}
