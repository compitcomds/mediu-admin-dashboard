// types/shopify.d.ts
export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    // Add more fields as needed
  }
  
  export interface Order {
    id: number;
    name: string;
    total_price: string;
    // Add more fields as needed
  }
  
  export interface Checkout {
    id: number;
    token: string;
    // Add more fields as needed
  }
  
  export interface DraftOrder {
    id: number;
    name: string;
    // Add more fields as needed
  }
  