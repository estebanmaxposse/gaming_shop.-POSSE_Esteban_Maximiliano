import React, { useState, useEffect } from "react";
import LoadingGif from "./LoadingGif";
import ItemDetail from "./ItemDetail";
import { Products } from "../data/Products";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore"

const ItemDetailContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [product, setData] = useState({});
  const { itemDetailID } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const getData = new Promise((resolve) => {
      setTimeout(() => {
        resolve(Products);
      }, 2000);
    });

    getData.then((res) => {
      setIsLoading(false);
      setData(res.find((product) => product.id === itemDetailID));
    });
  }, []);

  return (
    <div>
      {isLoading ? <LoadingGif /> : <ItemDetail product={product} />}
    </div>
  )
};

export default ItemDetailContainer;
