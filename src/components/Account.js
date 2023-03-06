import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AccountModal from "./AccountModal";
import OrderList from "./OrderList";
import { ToastContainer } from "react-toastify";
import { Row, Col, Button } from "react-bootstrap";

const Account = () => {
  const { logout, user, setUser } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-bg">
      <ToastContainer />
      <h1 className="category-headline">Account</h1>
      <Row className="profile d-flex justify-content-center m-0">
        <Col xs={12} md={4}>
          <div className="profile-details">
            <h2 className="profile-header">My details</h2>
            <div className="profile-details-pic">
              <img
                src={user?.avatar || "https://i.imgur.com/3oHh4La.png"}
                className="profile-details-pic-img"
                alt="profile-pic"
              />
            </div>
            <div>
              <p className="profile-details-header">Username</p>
              <p className="profile-details-data">
                {user?.username || user?.email}
              </p>
            </div>
            <div>
              <p className="profile-details-header">Email</p>
              <p className="profile-details-data">{user?.email}</p>
            </div>
            <div>
              <p className="profile-details-header">Full Name</p>
              <p
                className={`profile-details-data ${
                  !user?.fullName && "text-muted"
                }`}
              >
                {user?.fullName || "Add your full name"}
              </p>
            </div>
            <div>
              <p className="profile-details-header">Shipping Address</p>
              <p
                className={`profile-details-data ${
                  !user?.shippingAddress && "text-muted"
                }`}
              >
                {user?.shippingAddress || "Add a shipping address"}
              </p>
            </div>
            <div>
              <p className="profile-details-header">Phone Number</p>
              <p
                className={`profile-details-data ${
                  !user?.phoneNumber && "text-muted"
                }`}
              >
                {user?.phoneNumber || "Add a phone number"}
              </p>
            </div>
            <div>
              <p className="profile-details-header">Age</p>
              <p
                className={`profile-details-data ${
                  !user?.age && "text-muted"
                }`}
              >
                {user?.age || "Add an age"}
              </p>
            </div>
            <div className="profile-details-buttons d-flex">
              <AccountModal />
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div>
            <div className="profile-orders">
              <h2 className="profile-header">My orders</h2>
              <OrderList />
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div className="profile-wishlist">
            <h2 className="profile-header">My wishlist</h2>
            <p>Coming Soon!</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Account;
