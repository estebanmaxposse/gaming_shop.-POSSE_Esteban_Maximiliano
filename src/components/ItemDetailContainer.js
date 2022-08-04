import React, { useState, useEffect } from "react";
import LoadingGif from "./LoadingGif";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [product, setData] = useState({});
  const { itemDetailID } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const queryDatabase = getFirestore();
    const queryDoc = doc(queryDatabase, "product", itemDetailID);
    getDoc(queryDoc).then((res) => {
      setIsLoading(false);
      setData({ id: res.id, ...res.data() });
    });
  }, []);

  return (
    <div>{isLoading ? <LoadingGif /> : <ItemDetail product={product} />}</div>
  );
};

export default ItemDetailContainer;
