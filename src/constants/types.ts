import { Product } from "@prisma/client";

export type ProductType = {
  message: {
    allProducts: Product[];
    count: number;
  };
};



export type SliderCommentType = {
  id: string;
  comment: string;
  value: number;
  createdAt: string; // or `Date` if you're converting to Date
  userId: string;
  productId: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
};

export type CreatedComment = {
  id: string;
  productId: string;
  userId: string;
  value: number;
  comment: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export type Products = {
    name: string;
    id: string;
    desc: string;
    price: number;
    colors: string[];
    sizes: string[];
    images: string[];
    userId: string;
    quantity: number;
    cat: string | null;
    discount: number;
    createdAt: Date;
    storage: string | null;
    ingridents: string | null;
    types:string
}


export type ProductOrder = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
};