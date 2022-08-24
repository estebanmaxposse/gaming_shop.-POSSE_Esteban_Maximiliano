import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  //Youtube Feed
  (function () {
    var i,
      e,
      d = document,
      s = "script";
    i = d.createElement("script");
    i.async = 1;
    i.charset = "UTF-8";
    i.src =
      "https://cdn.curator.io/published/8597cfc5-ed40-4528-bb81-df18f85e351a.js";
    e = d.getElementsByTagName(s)[0];
    e.parentNode.insertBefore(i, e);
  })();

  return (
    <div className="footer">
      <Row>
        <Col xs={12} md={2}>
          <div className="footer-aboutus d-flex">
            <div className="footer-aboutus-logo d-flex">
              <img
                className="footer-aboutus-logo-img"
                src="https://i.imgur.com/ZD8hhwo.png"
                alt="logo"
              ></img>
              <div className="footer-aboutus-logo-caption d-flex">
                <p>Cartridge</p>
                <p>Valley</p>
              </div>
            </div>
            <p className="footer-aboutus-slogan">
              Playing alongside you since the 90s
            </p>
            <div className="footer-aboutus-socialmedia d-flex">
              <a
                href="https://www.facebook.com/esteban.posse.1/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook footer-aboutus-socialmedia-icon"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCsqgQCkRAhrxSVe78ogab_Q"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-youtube footer-aboutus-socialmedia-icon"></i>
              </a>
              <a
                href="https://twitter.com/estebanFmlLmao"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="bi bi-twitter footer-aboutus-socialmedia-icon"
                  target="_blank"
                  rel="noreferrer"
                ></i>
              </a>
              <a
                href="https://www.instagram.com/esteban.posse98/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram footer-aboutus-socialmedia-icon"></i>
              </a>
            </div>
          </div>
        </Col>
        <Col xs={12} md={1} />
        <Col xs={12} md={1}>
          <div className="footer-links">
            <h6>Links</h6>
            <ul>
              <li>
                <Link to={"/aboutus"}>About us</Link>
              </li>
              <li>
                <Link to={"/category/games"}>Games</Link>
              </li>
              <li>
                <Link to={"/category/consoles"}>Consoles</Link>
              </li>
              <li>
                <Link to={"/category/accessories"}>Accessories</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={12} md={1}>
          <div className="footer-contact">
            <h6>Contact</h6>
            <ul>
              <li>
                <Link to={"/support"}>Support</Link>
              </li>
              <li>
                <Link to={"/faqs"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/aboutme"}>About-me</Link>
              </li>
              <li>
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={12} md={1} />
        <Col xs={12} md={4}>
          <div className="footer-feed">
            <h6>Follow us on YouTube!</h6>
            <div id="curator-feed-default-feed-layout">
              <a
                href="https://curator.io"
                target="_blank"
                class="crt-logo crt-tag"
              >
                Powered by Curator.io
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
