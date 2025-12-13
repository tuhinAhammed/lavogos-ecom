// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [cartTotal, setCartTotal] = useState({
    subtotal: 0,
    shipping: 0,
    total: 0,
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        singleProduct,
        setSingleProduct,
        cartTotal,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
