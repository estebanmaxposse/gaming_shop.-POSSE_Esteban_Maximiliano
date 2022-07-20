import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { Products } from "../data/Products";
import { useParams } from "react-router-dom";

const ItemDetailContainer = ({ index }) => {
  const [product, setData] = useState({});
  const { itemDetailID } = useParams();

  useEffect(() => {
    const getData = new Promise((resolve) => {
      setTimeout(() => {
        resolve(Products);
      }, 2000);
    });

    getData.then(res => {setData(res.find(product => {
      return product.id === itemDetailID;
    }))
  console.log(res);}
    );
  }, []);

  return (
    <ItemDetail
      product={product}
    />
  );
};

export default ItemDetailContainer;
