import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Load from localStorage safely
  useEffect(() => {
    try {
      const data = localStorage.getItem("cart");

      if (data && data !== "undefined") {
        setCart(JSON.parse(data));
      }
    } catch (err) {
      console.error("Invalid cart data");
      localStorage.removeItem("cart");
    } finally {
      setLoading(false);
    }
  }, []);

  //  Save to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loading]);

  //  Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);

      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  //  Remove item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // ➕➖ Update quantity (SAFE)
  const updateQty = (id, qty) => {
    if (qty < 1) return; //  prevent invalid qty

    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  //  Clear cart (after order)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  //  Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  //  Total items count
  const totalItems = cart.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {!loading && children}
    </CartContext.Provider>
  );
};