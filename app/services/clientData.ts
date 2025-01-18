import type { Product } from "~/type";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(
    `https://fakestoreapi.com/products`
  );
  if (!response.ok) {
    throw new Error("Internal server error");
  }
  const data = response.json();
  return data;
}


export async function getProductsWithLimit(limit: number = 4): Promise<Product[]> {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Internal server error");
  }
  const data = response.json();
  return data;
}

export async function getProductById(pid: string): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${pid}`);
  if(!response.ok){
    throw new Error("Internal server error");
  }
  const data = response.json();
  return data
}

export async function getProductByCategory(category: string) {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  if(!response.ok){
    throw new Error("Internal server error");
  }
  const data = response.json();
  return data
}