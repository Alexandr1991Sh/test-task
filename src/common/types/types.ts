export interface Product {
  id: string;
  title: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface PaginatedResponse {
  items: Product[];
  totalCount: number;
}
