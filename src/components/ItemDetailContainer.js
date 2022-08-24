import React, { useState, useEffect } from "react";
import LoadingGif from "./LoadingGif";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemDetailContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [product, setData] = useState({});
  const { itemDetailID } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const queryDatabase = db;
    const queryDoc = doc(queryDatabase, "product", itemDetailID);
    getDoc(queryDoc).then((res) => {
      setIsLoading(false);
      setData({ id: res.id, ...res.data() });
    });
  }, [itemDetailID]);

  return (
    <div>{isLoading ? <LoadingGif /> : <ItemDetail product={product} />}</div>
  );
};

export default ItemDetailContainer;
