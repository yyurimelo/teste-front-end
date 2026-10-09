import type { Product, ProductsResponse } from '@/types/product';

const PRODUCTS_URL =
  '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';


export async function getProducts(): Promise<Product[]> {
  const response = (await fetch(PRODUCTS_URL).then((res) =>
    res.json(),
  )) as ProductsResponse;

  return response.products;
}