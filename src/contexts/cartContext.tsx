'use client';

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

const CartContext = createContext<number[]>([]);

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
  payload: number;
}

function cartReducer(cart: number[], action: CartAction): number[] {
  switch (action.type) {
    case CartActionKind.ADDED: {
      return [...cart, action.payload];
    }
    case CartActionKind.DELETED: {
      return cart.filter((t) => t !== action.payload);
    }
    case CartActionKind.SENT: {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
