import API, { defaultHeaders } from "../api";
import type { Product } from "../models/product";

export async function getProducts() {
  const res = await API.get<Product[]>("products", {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

export async function createProduct(product: Product) {
  const res = await API.post<Product>("products", product, {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });
  return res;
}
