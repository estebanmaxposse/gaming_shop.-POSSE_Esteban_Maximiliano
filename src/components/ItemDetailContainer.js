import React, { useState, useEffect } from "react";
import LoadingGif from "./LoadingGif";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";

const ItemDetailContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { getProduct, product } = useProduct();
  const { itemID } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProduct(itemID);
    setIsLoading(false);
  }, [itemID]);

  return (
    <div>{isLoading ? <LoadingGif /> : <ItemDetail product={product} />}</div>
  );
};

export default ItemDetailContainer;
