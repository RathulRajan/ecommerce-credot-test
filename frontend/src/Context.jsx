import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Store cart data in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Retrieve cart data from local storage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default Context;
