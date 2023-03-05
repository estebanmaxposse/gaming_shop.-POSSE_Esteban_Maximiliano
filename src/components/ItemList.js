import React, { useState, useEffect } from "react";
import Item from "./Item";
import LoadingGifWidescreen from "./LoadingGifWidescreen";
import { useProduct } from "../contexts/ProductContext";

const ItemList = ({ categoryID }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { products, getProducts } = useProduct();

  useEffect(() => {
    setIsLoading(true);

    getProducts()

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingGifWidescreen />
      ) : (
        products?.map((product, index) => (
          <Item key={product._id} product={product} index={index} />
        ))
      )}
    </>
  );
};

export default ItemList;
