import React, { useState, useContext } from "react";
const CartContext = React.createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const clearCart = () => setCart([]);

  const isInCart = (id) =>
    cart.find((product) => product.id === id) ? true : false;

  const removeProduct = (id) =>
    setCart(cart.filter((product) => product.id !== id));

  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(
        cart.map((product) => {
          return product.id === item.id
            ? { ...product, quantity: product.quantity + quantity }
            : product;
        })
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const totalProducts = () => {
    return cart.reduce(
      (accumulatedProducts, addedProduct) =>
        accumulatedProducts + addedProduct.quantity,
      0
    );
  };

  const totalPrice = () => {
    return cart.reduce(
      (accumulatedValue, addedValue) =>
        accumulatedValue + addedValue.quantity * addedValue.price,
      0
    );
  };

  const localTax = 21;

  const calcTaxes = (price) => {
    const taxResult = (price * localTax) / 100;
    return taxResult;
  };

  const addTaxes = (subtotal, tax) => subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        clearCart,
        isInCart,
        removeProduct,
        addItem,
        totalProducts,
        totalPrice,
        calcTaxes,
        addTaxes,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
