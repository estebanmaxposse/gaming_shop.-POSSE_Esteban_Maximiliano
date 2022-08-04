import React, { useState, useEffect } from "react";
import { Products } from "../data/Products";
import Item from "./Item";
import LoadingGif from "./LoadingGif";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const ItemList = ({ categoryID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const queryDatabase = getFirestore();
    const queryCollection = collection(queryDatabase, 'product');
    if (categoryID) {
      const queryFilter = query(queryCollection, where('category', '==', categoryID))
      getDocs(queryFilter)
        .then(res => {
          setIsLoading(false);
          setData(res.docs.map(product => ({ id: product.id, ...product.data() })))
        });
    } else {
      getDocs(queryCollection)
      .then(res => {
        setIsLoading(false);
        setData(res.docs.map(product => ({ id: product.id, ...product.data() })))
      })
    }
  }, [categoryID]);

  return (
    <>
      {isLoading ? <LoadingGif /> : products.map((product, index) => (<Item key={product.id} product={product} index={index} />))}
    </>
  )
};

export default ItemList;
