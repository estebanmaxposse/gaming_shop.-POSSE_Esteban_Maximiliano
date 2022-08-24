import React from "react";
import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";

const CartWidget = () => {
  const { totalProducts } = useCartContext();

  return (
    <>
      <Link to={"/cart"}>
        <Button variant="link" className="position-relative" id="cart-widget">
          <i className="bi bi-cart"></i>
          <Badge className="position-absolute rounded-pill bg-danger">
            {totalProducts() || ""}
          </Badge>
        </Button>
      </Link>
    </>
  );
};

export default CartWidget;
