import type { Product } from "./ProductDatabase";

const STORAGE_KEY   = "products";

export const saveProducts = (products: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export const loadProducts = (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};