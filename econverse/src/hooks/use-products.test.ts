import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useProducts } from '@/hooks/use-products';

import type { Product } from '@/types/product';

const products: Product[] = [
  {
    productName: 'Iphone 11 PRO MAX BRANCO 1',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
    photo: 'https://app.econverse.com.br/foto-iphone.png',
    price: 15000,
  },
];

type ProductsResponse = { success: boolean; products: Product[] };

const fetchMock = vi.fn();

/** `payload` como Error simula a promise rejeitada (ex.: CORS bloqueado). */
function respondWith(payload: ProductsResponse | Error) {
  fetchMock.mockResolvedValueOnce({
    json: async () => {
      if (payload instanceof Error) throw payload;
      return payload;
    },
  });
}

describe('useProducts', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('começa em loading antes da resposta chegar', async () => {
    respondWith({ success: true, products });

    const { result } = renderHook(() => useProducts());

    expect(result.current.status).toBe('loading');
    expect(result.current.products).toEqual([]);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('entrega os produtos quando a requisição dá certo', async () => {
    respondWith({ success: true, products });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.products).toEqual(products);
  });

  it('busca na URL relativa, que o proxy do Vite repassa à API', async () => {
    respondWith({ success: true, products });

    renderHook(() => useProducts());

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock.mock.calls[0][0]).toBe(
      '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
    );
  });

  it('vai para error e zera a lista quando a requisição falha', async () => {
    respondWith(new TypeError('Failed to fetch'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.products).toEqual([]);
  });

  it('retry volta para loading e refaz a requisição', async () => {
    respondWith(new TypeError('Failed to fetch'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.status).toBe('error'));

    respondWith({ success: true, products });
    act(() => result.current.retry());

    expect(result.current.status).toBe('loading');

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.products).toEqual(products);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('não atualiza estado se o componente desmontar antes da resposta', async () => {
    respondWith({ success: true, products });

    const { unmount, result } = renderHook(() => useProducts());

    expect(result.current.status).toBe('loading');

    unmount();

    // A flag `active` impede o setState pós-unmount; sem o aviso "update
    // not wrapped in act", nada foi gravado depois do cleanup.
    await act(async () => {});

    expect(result.current.status).toBe('loading');
    expect(result.current.products).toEqual([]);
  });
});