import React from "react";
import { Col, Row, Button } from "react-bootstrap";

const Footer = () => {
  /* curator-feed-default-feed-layout */
  (function(){
    var i,e,d=document,s="script";i=d.createElement("script");i.async=1;i.charset="UTF-8";
    i.src="https://cdn.curator.io/published/8597cfc5-ed40-4528-bb81-df18f85e351a.js";
    e=d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);
    })();

  return (
    <div className="footer">
      <Row>
        <Col xs={12} md={2}>
          <div className="footer-aboutus d-flex">
            <div className="footer-aboutus-logo d-flex">
              <img className="footer-aboutus-logo-img" src={require('../img/logo_no_text.png')}></img>
              <div className="footer-aboutus-logo-caption d-flex">
                <p>Cartridge</p>
                <p>Valley</p>
              </div>
            </div>
            <p className="footer-aboutus-slogan">Playing alongside you since the 90s</p>
            <div className="footer-aboutus-socialmedia d-flex">
                <i className="bi bi-facebook footer-aboutus-socialmedia-icon"></i>
                <i className="bi bi-youtube footer-aboutus-socialmedia-icon"></i>
                <i className="bi bi-twitter footer-aboutus-socialmedia-icon"></i>
                <i className="bi bi-instagram footer-aboutus-socialmedia-icon"></i>
            </div>
          </div>
        </Col>
        <Col xs={12} md={1}/>
        <Col xs={12} md={1}>
          <div className="footer-links">
            <h6>Links</h6>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Games</a>
              </li>
              <li>
                <a href="#">Consoles</a>
              </li>
              <li>
                <a href="#">Accessories</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={12} md={1}>
          <div className="footer-contact">
            <h6>Contact</h6>
            <ul>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">About-me</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={12} md={1}/>
        <Col xs={12} md={4}>
          <div className="footer-feed">
            <h6>Follow us on YouTube!</h6>
            <div id="curator-feed-default-feed-layout"><a href="https://curator.io" target="_blank" className="crt-logo crt-tag">Powered by Curator.io</a></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
