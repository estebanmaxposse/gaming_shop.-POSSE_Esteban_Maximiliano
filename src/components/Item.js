import { Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <Col md={4} className="mb-4">
      <Link to={`/detail/${product._id}`}>
        <Card className="product-card">
          <div className="product-card-img">
            <Card.Img variant="top" src={product.thumbnail} />
          </div>
          <Card.Body>
            <Card.Title className="mb-3">{product.title}</Card.Title>
            <div className="d-flex w-100 price-stock">
              <h5>${product.price}.00</h5>
              <p className="text-muted">Stock Available: {product.stock}</p>
            </div>
            <Button className="product-card-button">Add to cart</Button>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default Item;
