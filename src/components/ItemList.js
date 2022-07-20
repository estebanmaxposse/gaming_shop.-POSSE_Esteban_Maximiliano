import React, { useState, useEffect } from "react";
import { Products } from "../data/Products";
import Item from "./Item";

export const ItemList = ({categoryID}) => {
  const [products, setData] = useState([]);

  useEffect(() => {
    const getProducts = new Promise((resolve) => {
      setTimeout(() => {
        resolve(Products);
      }, 2000);
    });
    if (categoryID) {
      getProducts.then((resolve) => {
        setData(resolve.filter(product => product.category === categoryID)
        )
      });
    } else {
      getProducts.then((resolve) => setData(resolve));
    }
  }, [categoryID]);

  return (
    products.map((product, index) => <Item key={product.id} product={product} index={index}/>)
  );
};
