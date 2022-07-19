import React, { useState, useEffect } from 'react';
import ItemDetail from "./ItemDetail";
import { Products } from "../data/Products";

const ItemDetailContainer = ({showModal, closeModal, index}) => {
    const [product, setData] = useState([]);
    
    useEffect(() => {
      if (showModal) {
        const getData = new Promise(resolve => {
          setTimeout(() => {
              resolve(Products[index]);
          }, 2000);
        });
      
        getData.then((res) => {
          setData(res);
        });
      }
    }, [showModal]);
    

  return (
    <ItemDetail product={product} showModal={showModal} closeModal={closeModal}/>
  )
};

export default ItemDetailContainer;