// src/types/index.ts
export interface EURepresentative {
  name: string;
  email: string;
  address: string;
}

export interface Product {
  category: unknown;
  name: unknown;
  id: number;
  title: string;
  price: number;
  artist: string;
  description: string;
  dimensions: string;
  medium: string;
  image: string;
  stock?: number;
  warranty: string;
  warnings: string;
  careInstructions: string;
  returnPolicy: string;
  additionalImages: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerData {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

export interface OrderConfirmationData {
  customer: CustomerData;
  paymentMethod: string;
  orderTotal: number;
  orderDate: string;
}

// Make sure you're using default export if that's what you're importing
export default { };