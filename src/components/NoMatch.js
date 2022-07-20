import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="not-found">
      <Row>
        <Col xs={12} md={6} className="not-found-text">
          <h1 className="not-found-header-title">Oops!</h1>
          <h3 className="not-found-header-subtitle">It seems you got lost!</h3>
          <p>
            Try going back to the previous page or click the button below to go
            back to the Homepage!
          </p>
        </Col>
        <Col xs={12} md={4} className="not-found-image">
          <Image src={require("../img/404.gif")} />
          <Link to={"/"}>
            <Button>Go home!</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default NoMatch;
