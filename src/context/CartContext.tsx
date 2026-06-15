// // import React, {
// //   createContext,
// //   useContext,
// //   useState,
// //   useCallback,
// //   useEffect,
// // } from 'react';

// // import { CartItem, Product } from '../types';
// // import { addCartAPI, getCartAPI } from '../service';

// // interface CartCtx {
// //   items: CartItem[];
// //   loading: boolean;

// //   addToCart: (
// //     p: Product,
// //     size: '1L' | '5L' | '15L'
// //   ) => void;

// //   removeFromCart: (
// //     id: string,
// //     size: string
// //   ) => void;

// //   updateQty: (
// //     id: string,
// //     size: string,
// //     qty: number
// //   ) => void;

// //   clearCart: () => void;

// //   totalItems: number;
// //   totalPrice: number;
// // }

// // const Ctx = createContext<CartCtx | null>(null);

// // export const CartProvider: React.FC<{
// //   children: React.ReactNode;
// // }> = ({ children }) => {

// //   const [items, setItems] = useState<CartItem[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   // const addToCart = useCallback(
// //   //   (
// //   //     product: Product,
// //   //     size: '1L' | '5L' | '15L'
// //   //   ) => {

// //   //     const selectedVariant =
// //   //       product.variants.find(
// //   //         (v) =>
// //   //           v.size.replace('SIZE_', '') === size
// //   //       );

// //   //     if (!selectedVariant) return;

// //   //     setItems((prev) => {

// //   //       const existing = prev.find(
// //   //         (i) =>
// //   //           i.product.id === product.id &&
// //   //           i.size === size
// //   //       );

// //   //       if (existing) {
// //   //         return prev.map((i) =>
// //   //           i.product.id === product.id &&
// //   //           i.size === size
// //   //             ? {
// //   //                 ...i,
// //   //                 quantity: i.quantity + 1,
// //   //               }
// //   //             : i
// //   //         );
// //   //       }

// //   //       return [
// //   //         ...prev,
// //   //         {
// //   //           product,
// //   //           size,
// //   //           quantity: 1,
// //   //           price: selectedVariant.price,
// //   //         },
// //   //       ];
// //   //     });
// //   //   },
// //   //   []
// //   // );


// //   useEffect(() => {

// //     const token = sessionStorage.getItem('token');

// //     if (token) {
// //       getCartItems();
// //     }

// //   }, []);

// //   const getCartItems = async () => {
// //     try {

// //       setLoading(true);

// //       const response = await getCartAPI();

// //       console.log(
// //         'Cart Response:',
// //         response?.data
// //       );

// //       // Example API response handling
// //       setItems(response?.data || []);

// //     } catch (error) {
// //       console.error(
// //         'Get cart failed:',
// //         error
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const addToCart = useCallback(
// //     async (
// //       product: Product,
// //       size: '1L' | '5L' | '15L'
// //     ) => {

// //       const selectedVariant =
// //         product.variants.find(
// //           (v) =>
// //             v.size.replace('SIZE_', '') === size
// //         );

// //       if (!selectedVariant) return;

// //       try {

// //         await addCartAPI({
// //           variantId: selectedVariant.id,
// //           quantity: 1,
// //         });

// //         // Refresh cart from backend
// //         await getCartItems();

// //       } catch (error) {
// //         console.error(
// //           'Add cart failed:',
// //           error
// //         );
// //       }
// //     },
// //     []
// //   );


// //   const removeFromCart = useCallback(
// //     (id: string, size: string) => {
// //       setItems((prev) =>
// //         prev.filter(
// //           (i) =>
// //             !(
// //               i.product.id === id &&
// //               i.size === size
// //             )
// //         )
// //       );
// //     },
// //     []
// //   );

// //   const updateQty = useCallback(
// //     (
// //       id: string,
// //       size: string,
// //       qty: number
// //     ) => {

// //       if (qty <= 0) {
// //         removeFromCart(id, size);
// //         return;
// //       }

// //       setItems((prev) =>
// //         prev.map((i) =>
// //           i.product.id === id &&
// //             i.size === size
// //             ? {
// //               ...i,
// //               quantity: qty,
// //             }
// //             : i
// //         )
// //       );
// //     },
// //     [removeFromCart]
// //   );

// //   const clearCart = useCallback(() => {
// //     setItems([]);
// //   }, []);

// //   const totalItems = items.reduce(
// //     (sum, item) => sum + item.quantity,
// //     0
// //   );

// //   const totalPrice = items.reduce(
// //     (sum, item) =>
// //       sum + item.price * item.quantity,
// //     0
// //   );

// //   return (
// //     <Ctx.Provider
// //       value={{
// //         items,
// //         loading,
// //         addToCart,
// //         removeFromCart,
// //         updateQty,
// //         clearCart,
// //         totalItems,
// //         totalPrice,
// //       }}
// //     >
// //       {children}
// //     </Ctx.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   const c = useContext(Ctx);

// //   if (!c) {
// //     throw new Error('no cart');
// //   }

// //   return c;
// // };









// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
// } from 'react';

// import { Product } from '../types';
// import {
//   addCartAPI, clearCartAPI, getCartAPI,
//   removeCartAPI, updateCartAPI
// } from '../service';

// // ── Flat shape returned by the cart API ──────────────────────────────────────
// export interface CartItem {
//   id: string;          // cart-line id  (use this as the unique key)
//   variantId: string;
//   productName: string;
//   productEmoji: string;
//   size: string;        // e.g. "SIZE_1L"
//   price: number;       // unit price
//   quantity: number;
//   totalPrice: number;  // price * quantity
// }

// interface CartCtx {
//   items: CartItem[];
//   loading: boolean;

//   addToCart: (product: Product, size: '1L' | '5L' | '15L') => Promise<void>;
//   removeFromCart: (cartItemId: string) => Promise<void>;
//   updateQty: (cartItemId: string, qty: number) => Promise<void>;
//   clearCart: () => void;

//   totalItems: number;
//   totalPrice: number;
// }

// const Ctx = createContext<CartCtx | null>(null);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ── Fetch cart from backend ────────────────────────────────────────────────
//   const getCartItems = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getCartAPI();
//       setItems(response?.data || []);
//     } catch (error) {
//       console.error('Get cart failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     if (token) getCartItems();
//   }, [getCartItems]);

//   // ── Add item ───────────────────────────────────────────────────────────────
//   const addToCart = useCallback(
//     async (product: Product, size: '1L' | '5L' | '15L') => {
//       const selectedVariant = product.variants.find(
//         (v) => v.size.replace('SIZE_', '') === size
//       );
//       if (!selectedVariant) return;

//       try {
//         await addCartAPI({ variantId: selectedVariant.id, quantity: 1 });
//         await getCartItems(); // refresh from backend
//       } catch (error) {
//         console.error('Add cart failed:', error);
//       }
//     },
//     [getCartItems]
//   );

//   // ── Remove item ────────────────────────────────────────────────────────────
//   const removeFromCart = useCallback(
//     async (cartItemId: string) => {
//       // Optimistic update
//       setItems((prev) => prev.filter((i) => i.id !== cartItemId));
//       try {
//         await removeCartAPI(cartItemId);
//       } catch (error) {
//         console.error('Remove cart failed:', error);
//         await getCartItems(); // rollback on failure
//       }
//     },
//     [getCartItems]
//   );

//   // ── Update quantity ────────────────────────────────────────────────────────
//   const updateQty = useCallback(
//     async (cartItemId: string, qty: number) => {
//       if (qty <= 0) {
//         await removeFromCart(cartItemId);
//         return;
//       }

//       // Optimistic update
//       setItems((prev) =>
//         prev.map((i) =>
//           i.id === cartItemId
//             ? { ...i, quantity: qty, totalPrice: i.price * qty }
//             : i
//         )
//       );

//       try {
//         await updateCartAPI(cartItemId, qty);
//       } catch (error) {
//         console.error('Update cart failed:', error);
//         await getCartItems(); // rollback on failure
//       }
//     },
//     [removeFromCart, getCartItems]
//   );

//   // ── Clear cart ─────────────────────────────────────────────────────────────
//   const clearCart = useCallback(async () => {
//     await clearCartAPI();
//     setItems([]);
//   }, []);

//   // ── Derived totals ─────────────────────────────────────────────────────────
//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

//   return (
//     <Ctx.Provider
//       value={{
//         items,
//         loading,
//         addToCart,
//         removeFromCart,
//         updateQty,
//         clearCart,
//         totalItems,
//         totalPrice,
//       }}
//     >
//       {children}
//     </Ctx.Provider>
//   );
// };

// export const useCart = () => {
//   const c = useContext(Ctx);
//   if (!c) throw new Error('useCart must be used within a CartProvider');
//   return c;
// };











import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { Product } from '../types';
import {
  addCartAPI, clearCartAPI, getCartAPI,
  removeCartAPI, updateCartAPI
} from '../service';

export interface CartItem {
  id: string;
  variantId: string;
  productName: string;
  productEmoji: string;
  size: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartCtx {
  items: CartItem[];
  loading: boolean;

  addToCart: (product: Product, size: '1L' | '5L' | '15L') => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQty: (cartItemId: string, qty: number) => Promise<void>;
  clearCart: () => void;

  totalItems: number;
  totalPrice: number;

  // ── Coupon ──────────────────────────────────────────────────────────────
  discount: number;
  appliedCoupon: string | null;
  setDiscount: (amount: number) => void;
  setAppliedCoupon: (code: string | null) => void;
  clearCoupon: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ── Coupon state ─────────────────────────────────────────────────────────
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const clearCoupon = useCallback(() => {
    setDiscount(0);
    setAppliedCoupon(null);
  }, []);

  // ── Fetch cart ────────────────────────────────────────────────────────────
  const getCartItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCartAPI();
      setItems(response?.data || []);
    } catch (error) {
      console.error('Get cart failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) getCartItems();
  }, [getCartItems]);

  // ── Add item ──────────────────────────────────────────────────────────────
  const addToCart = useCallback(
    async (product: Product, size: '1L' | '5L' | '15L') => {
      const selectedVariant = product.variants.find(
        (v) => v.size.replace('SIZE_', '') === size
      );
      if (!selectedVariant) return;

      try {
        await addCartAPI({ variantId: selectedVariant.id, quantity: 1 });
        await getCartItems();
      } catch (error) {
        console.error('Add cart failed:', error);
      }
    },
    [getCartItems]
  );

  // ── Remove item ───────────────────────────────────────────────────────────
  const removeFromCart = useCallback(
    async (cartItemId: string) => {
      setItems((prev) => prev.filter((i) => i.id !== cartItemId));
      try {
        await removeCartAPI(cartItemId);
      } catch (error) {
        console.error('Remove cart failed:', error);
        await getCartItems();
      }
    },
    [getCartItems]
  );

  // ── Update quantity ───────────────────────────────────────────────────────
  const updateQty = useCallback(
    async (cartItemId: string, qty: number) => {
      if (qty <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      setItems((prev) =>
        prev.map((i) =>
          i.id === cartItemId
            ? { ...i, quantity: qty, totalPrice: i.price * qty }
            : i
        )
      );

      try {
        await updateCartAPI(cartItemId, qty);
      } catch (error) {
        console.error('Update cart failed:', error);
        await getCartItems();
      }
    },
    [removeFromCart, getCartItems]
  );

  // ── Clear cart ────────────────────────────────────────────────────────────
  const clearCart = useCallback(async () => {
    await clearCartAPI();
    setItems([]);
    clearCoupon(); // also wipe coupon when cart is cleared
  }, [clearCoupon]);

  // ── Derived totals ────────────────────────────────────────────────────────
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Ctx.Provider
      value={{
        items,
        loading,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        discount,
        appliedCoupon,
        setDiscount,
        setAppliedCoupon,
        clearCoupon,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used within a CartProvider');
  return c;
};