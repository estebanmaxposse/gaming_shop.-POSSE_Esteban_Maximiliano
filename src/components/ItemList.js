import React, { useState, useEffect } from "react";
import { Products } from "../data/Products";
import Item from "./Item";
import LoadingGif from "./LoadingGif";

export const ItemList = ({ categoryID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getProducts = new Promise((resolve) => {
      setTimeout(() => {
        resolve(Products);
      }, 2000);
    });
    if (categoryID) {
      getProducts.then((resolve) => {
        setIsLoading(false);
        setData(resolve.filter((product) => product.category === categoryID));
      });
    } else {
      getProducts.then((resolve) => {
        setIsLoading(false);
        setData(resolve);
      });
    }
  }, [categoryID]);

  return (
    <>
      {isLoading ? <LoadingGif /> : products.map((product, index) => (<Item key={product.id} product={product} index={index} />))}
    </>
  )
};
