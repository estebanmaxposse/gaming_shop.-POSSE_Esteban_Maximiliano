import React, { useState, useEffect } from "react";
import { Products } from "../data/Products";
import  Item from "./Item";

export const ItemList = () => {
  const [products, setData] = useState([]);

  useEffect(() => {
    const getProducts = new Promise((resolve) => {
      setTimeout(() => {
        resolve(Products);
      }, 2000);
    });
    getProducts.then((resolve) => setData(resolve));
  });

  return (
    products.map(product => <Item key={product.id} product={product}/>)
  );
};
