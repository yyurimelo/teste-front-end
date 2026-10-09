import { useCallback, useEffect, useState } from 'react';

import { getProducts } from '@/lib/api/products';
import type { Product } from '@/types/product';

type ProductsState =
  | { status: 'loading'; products: Product[] }
  | { status: 'success'; products: Product[] }
  | { status: 'error'; products: Product[] };

export function useProducts() {
  const [state, setState] = useState<ProductsState>({
    status: 'loading',
    products: [],
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((products) => {
        if (active) {
          setState({ status: 'success', products });
        }
      })
      .catch(() => {
        if (active) {
          setState({ status: 'error', products: [] });
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading', products: [] });
    setAttempt((current) => current + 1);
  }, []);

  return { ...state, retry };
}