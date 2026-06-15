// context/ProductContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProductsAPI } from '../service';

const ProductContext = createContext<any>(null);

export const ProductProvider = ({ children }: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const limit = 10;

    useEffect(() => {
        getProducts(0);
    }, []);

    const getProducts = async (currentPage: number) => {
        try {
            setLoading(true);

            const response = await getProductsAPI(currentPage, limit);

            const newProducts = response?.data || [];

            if (currentPage === 0) {
                setProducts(newProducts);
            } else {
                // setProducts(prev => [...prev, ...newProducts]);
                setProducts((prev: any) => ({
                    ...newProducts,
                    content: [...prev.content, ...newProducts.content],
                }));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreProducts = async () => {
        const nextPage = page + 1;

        setPage(nextPage);

        await getProducts(nextPage);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                loadMoreProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);