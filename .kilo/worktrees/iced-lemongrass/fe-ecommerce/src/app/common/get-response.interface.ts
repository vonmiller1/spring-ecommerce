import { Category } from "./category";
import { Product } from "./product";

export interface GetResponseProducts {
    _embedded: {
      products: Product[];
    },
    page : {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number,
    }
  }

export interface GetResponseCategories {
    _embedded: {
      categories: Category[];
    }
  }