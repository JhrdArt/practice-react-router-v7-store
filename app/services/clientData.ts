import type { Product, ProductWithoutId } from "~/type";

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

export async function postProduct(object: ProductWithoutId ) {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(!response.ok){
    throw new Error("Internal server error while post");
    }
    const data  = response.json();

    return data
}

export async function patchProduct(id: Product["id"], object: ProductWithoutId) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(!response.ok){
    throw new Error("Internal server error while update");
      
    }
    const data = await response.json();
    return data
}