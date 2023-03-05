import React from "react";
import { useCartContext } from "../contexts/CartContext";
import { Col } from "react-bootstrap";

const ItemCart = ({ product }) => {
  const { removeProduct } = useCartContext();

  return (
    <div>
      <Col className="item-cart d-flex" xs={12}>
        <img src={product.thumbnail} alt={product.title} />
        <div className="item-cart-text">
          <h4>{product.title}</h4>
          <p>Quantity: {product.quantity}</p>
          <p>Cost per unit: ${product.price}</p>
          <p>Item total: ${product.quantity * product.price}</p>
          <button onClick={() => removeProduct(product.id)}>
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </Col>
    </div>
  );
};

export default ItemCart;
