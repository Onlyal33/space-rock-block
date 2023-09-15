'use client';

import { AsteroidShort } from '@/components/AsteroidEntry/AsteroidEntry';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

const CartContext = createContext<AsteroidShort[]>([]);

const CartDispatchContext = createContext<Dispatch<CartAction>>(() => null);

export const useCart = () => {
  return useContext(CartContext);
};
export const useCartDispatch = () => {
  return useContext(CartDispatchContext);
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export enum CartActionKind {
  ADDED = 'added',
  DELETED = 'deleted',
  SENT = 'sent',
}

interface CartAction {
  type: CartActionKind;
  payload: AsteroidShort | null;
}

function cartReducer(cart: AsteroidShort[], action: CartAction) {
  switch (action.type) {
    case CartActionKind.ADDED: {
      return action.payload ? [...cart, action.payload] : cart;
    }
    case CartActionKind.DELETED: {
      return cart.filter((t) => t.id !== action.payload?.id);
    }
    case CartActionKind.SENT: {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
