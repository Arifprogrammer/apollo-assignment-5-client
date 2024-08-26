export type TProduct = {
  _id: string;
  name: string;
  image: string;
  brand: string;
  availableQuantity: number;
  orderQuantity: number;
  price: number;
  rating: number;
  description?: string;

  createdAt?: string;
  updatedAt?: string;
};
