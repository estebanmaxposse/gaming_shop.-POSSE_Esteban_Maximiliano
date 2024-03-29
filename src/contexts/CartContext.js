import React, { useState, useContext } from "react";
import { useAuth } from "./AuthContext";
import jwt_decode from "jwt-decode";
import env from "react-dotenv";
const CartContext = React.createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {

  //PRODUCT FORMATTING
  const formatProducts = (productObject) => {
    const { count, ...product } = productObject;
    const formattedProducts = Array(count).fill(product);
    return formattedProducts;
  }

  const reformatProductsFromDB = (cartObject) => {
    const productsWithCount = cartObject.products.map((item) => {
      const { quantity, product } = item;
      return { ...product, count: quantity };
    });
    return productsWithCount;
  }

  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartID, setCartID] = useState('');

  //API CALLS
  const createCartDB = async () => {
    try {
      const response = await fetch(env.API_URL + '/api/cart', {
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
      setCartID(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const addProductsDB = async (arrayOfProducts, cartIDToAddProducts) => {
    try {
      const response = await fetch(`${env.API_URL}/api/cart/${cartIDToAddProducts}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(arrayOfProducts),
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  const getCartProductsDB = async (cartIDParameter) => {
    if (cartID === '' && !cartIDParameter) {
      return false
    }
    let cartIDForBack = cartIDParameter || cartID;
    try {
      const response = await fetch(`${env.API_URL}/api/cart/${cartIDForBack}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
      return false
    }
  }

  const getCartByUserID = async (userToken) => {
    let token = userToken || localStorage.getItem('token');
    let userID = jwt_decode(token).user._id;
    try {
      const response = await fetch(`${env.API_URL}/api/cart/user/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      if (response.status === 404) {
        return false
      }
      const data = await response.json();
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
      const response = await fetch(`${env.API_URL}/api/cart/${cartID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error);
      return false
    }
  }

  const clearCartDB = async () => {
    try {
      const response = await fetch(`${env.API_URL}/api/cart/${cartID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  const removeProductDB = async (id) => {
    try {
      const response = await fetch(`${env.API_URL}/cart/${cartID}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCartDB = async () => {
    try {
      const response = await fetch(`${env.API_URL}/api/cart/${cartID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json();
      setCartID('');
    } catch (error) {
      console.log(error);
    }
  }

  const getOrders = async () => {
    let token = localStorage.getItem('token');
    let userID = jwt_decode(token).user._id;
    try {
      const response = await fetch(`${env.API_URL}/api/order/user/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      const data = await response.json();
      console.log('ORDERS FETCHED: ', data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const createOrder = async () => {
    try {
      const response = await fetch(`${env.API_URL}/api/order/${cartID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      const data = await response.json();
      console.log('ORDER CREATED: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  //CART METHODS
  const initialCart = async (userToken) => {
    const userCartDB = await getCartByUserID(userToken);
    const productsDB = await getCartProductsDB(userCartDB._id);
    let reformattedProducts
    if (Array.isArray(productsDB) && productsDB.length !==0) {
      reformattedProducts = reformatProductsFromDB(productsDB);
    } else {
      reformattedProducts = []
    }
    if (userCartDB) {
      setCartID(userCartDB._id);
      setCart(reformattedProducts);
    } else {
      console.log('NO CART IN DB');
      const newCartID = await createCartDB();
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
    let formattedProducts = formatProducts(newItem)
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
        createOrder,
        getOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
