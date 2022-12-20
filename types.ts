export type Product = {
    description: string;
    id: string;
    price: number;
    student_price: number;
    title: string;
};

// define cartProduct export type which have quantity and product details
export type cartProduct = {
    quantity: number;
    product: Product;
};

export type User = {
    id: string;
    username: string;
    student?: {
        id: string;
        enrolled_year: number;
        major: string;
        name: string;
    }
    joined_date: string;
    role: { id: string };
}


export type StateType = {
    search: string;
    auth: {
        username: string;
        token: string;
        role: string;
    };
    productList: Product[];
    cart: cartProduct[];
    filteredList: Product[];
};

export type Transaction = {
    id: string;
    user: {
        username: string;
        role: string;
    }
    cart: cartProduct[];
    transaction_timestamp: string;
}

export type LoginRecord = {
    id: string;
    user: {
        username: string;
    }
    login_date: string;
    login_ip: string;
    success: boolean;
    remarks: string;
}