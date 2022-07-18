import React, { useState, useEffect } from 'react';
import ItemDetail from "./ItemDetail";
import { Products } from "../data/Products";

const ItemDetailContainer = () => {
    const [product, setData] = useState({});
    
    useEffect(() => {
      const getData = new Promise(resolve => {
        setTimeout(() => {
            resolve(Products[0]);
        }, 2000);
      });
    
      getData.then((res) => {
        setData(res)
        console.log(res)
      });
    }, [{}])
    

  return (
    <ItemDetail product={product}/>
  )
};

export default ItemDetailContainer;