import React, { useState, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
const CartContext = React.createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {

  const formatProducts = (productObject) => {
    console.log('PRODUCT OBJECT: ', productObject);
    const { count, ...product } = productObject;
    const formattedProducts = Array(count).fill(product);
    return formattedProducts;
  }

  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartID, setCartID] = useState('');

  //API CALLS
  const createCartDB = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          user: user,
        }),
      });
      const data = await response.json();
      console.log('CREATE CART DB: ', data);
      setCartID(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const addProductsDB = async (arrayOfProducts, cartIDToAddProducts) => {
    console.log('PRODUCTS TO ADD TO DB: ', arrayOfProducts);
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartIDToAddProducts}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(arrayOfProducts),
      });
      const data = await response.json();
      console.log('ADDED PRODUCTS DB: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCartProductsDB = async () => {
    if (cartID === '') {
      return false
    }
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartID}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      console.log('PRODUCTS FROM DB: ', data);
      return data
    } catch (error) {
      console.log(error);
      return false
    }
  }

  const getCartDB = async () => {
    if (cartID === '') {
      return false
    }
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      console.log('CART FROM DB: ', data);
      return data
    } catch (error) {
      console.log(error);
      return false
    }
  }

  const clearCartDB = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartID}/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      console.log('CART CLEARED DB: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  const removeProductDB = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartID}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      console.log('DELETED PRODUCT DB: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCartDB = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      setCartID('');
      console.log('DELETED CART DB: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  const initialCart = async () => {
    const cartDB = await getCartDB();
    const productsDB = await getCartProductsDB();
    if (cartDB) {
      setCartID(cartDB._id);
      setCart(productsDB);
    } else {
      const newCartID = await createCartDB();
      setCartID(newCartID);
    }
  }

  const isInCart = (id) =>
    cart.find((product) => product._id === id) ? true : false;

  const removeProduct = async (id) => {
    const productToBeRemoved = cart.find((product) => product._id === id);
    setCart(cart.filter((product) => product._id !== id));
    await removeProductDB(productToBeRemoved._id);
  }

  const addItem = async (item, count) => {
    let newItem = null
    let myNewCartId = cartID;
    if (isInCart(item._id)) {
      setCart(
        cart.map((product) => {
          if (product._id === item._id) {
            newItem = { ...product, count: product.count + count };
            return newItem;
          } else {
            return product;
          }
        })
      );
    } else {
      newItem = { ...item, count };
      setCart([...cart, newItem]);
    }
    console.log('NEW ITEM: ', newItem);
    let formattedProducts = formatProducts(newItem)
    console.log('FORMATTED PRODUCTS: ', formattedProducts);
    await addProductsDB(formattedProducts, myNewCartId);
  };

  const clearCart = async () => {
    setCart([])
    await clearCartDB();
  };


  const getTotalProducts = () => {
    let totalProducts = cart.reduce(
      (accumulatedProducts, addedProduct) =>
        accumulatedProducts + addedProduct.count,
      0
    );
    return totalProducts;
  };

  const totalPrice = () => {
    return cart.reduce(
      (accumulatedValue, addedValue) =>
        accumulatedValue + addedValue.count * addedValue.price,
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
        getTotalProducts,
        totalPrice,
        calcTaxes,
        addTaxes,
        cart,
        getCartProductsDB,
        deleteCartDB,
        initialCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
