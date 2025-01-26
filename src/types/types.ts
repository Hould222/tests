export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface CartItem {
    id: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
}

export interface ProductListProps {
    dealerIds: Array<string>;
}

export interface CartState {
    items: CartItem[];
    
}


// Определение типа для продукта
export interface Product {
    name: string;
    price: number;
    image: string;
}

// Определение типа для состояния слайса
export interface DealersState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null; 
}

export interface DealerListProps {
    dealerList: string[];
    filterDealers: (condition: string) => void;
}
