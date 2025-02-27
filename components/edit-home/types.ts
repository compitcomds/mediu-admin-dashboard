export interface Product {
  id: string;
  title: string;
  price: number;
  tags: string[];
}

export interface Subcategory {
  id: number;
  name: string;
  tag: string;
}

export interface Section {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
