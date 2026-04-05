import { toaster } from "@/components/ui/toaster";
import type { ICartItem, ICartProduct } from "@/interfaces/interfaces";


export const addItemShoppingToCart = (
  proItem: ICartProduct,
  cartItems: ICartItem[],
): ICartItem[] => {
  const existsItem = cartItems.find((i) => i.id === proItem.id);

  if (existsItem) {
    toaster.create({
      title: "Product Updated",
      description: "Quantity increased 🛒",
    });

    return cartItems.map((i) =>
      i.id === proItem.id ? { ...i, quantity: i.quantity + 1 } : i,
    );
  }

  toaster.create({
    title: "Product Added",
    description: "Added to cart successfully 🎉",
  });

  return [...cartItems, { ...proItem, quantity: 1 }];
};
