import { ProductCartType } from "@/provider/cart-store";

export function disAbleCart(
  products: ProductCartType[],
  id: string,
  quantity: number
) {
  const inCart = products.find((item) => item.id === id);

  const cartQuantity = inCart?.quantity || 0;

  return quantity <= 0 || cartQuantity >= quantity;
}


export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}
