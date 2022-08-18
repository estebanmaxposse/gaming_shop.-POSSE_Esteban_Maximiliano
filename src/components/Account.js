import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AccountModal from "./AccountModal";
import { ToastContainer, toast } from "react-toastify";

const Account = () => {
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out!", {
        position: toast.POSITION.TOP_CENTER
      });
      navigate("/");
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div className="profile-bg">
      <ToastContainer />
      <h1 className="category-headline">Account</h1>
      <div className="profile">
        <div className="profile-details">
          <h2 className="profile-header">My details</h2>
          <div className="profile-details-pic">
            <img
              src={currentUser?.photoURL || "https://i.imgur.com/3oHh4La.png"}
              className="profile-details-pic-img"
            />
          </div>
          <div>
            <p className="profile-details-header">Username</p>
            <p className="profile-details-data">
              {currentUser?.displayName || currentUser?.email}
            </p>
          </div>
          <div>
            <p className="profile-details-header">Email</p>
            <p className="profile-details-data">{currentUser?.email}</p>
          </div>
          <div>
            <p className="profile-details-header">Shipping Address</p>
            <p className="profile-details-data text-muted">
              {currentUser?.shippingAddress || "Add a shipping address"}
            </p>
          </div>
          <div>
            <p className="profile-details-header">Phone Number</p>
            <p className="profile-details-data text-muted">
              {currentUser?.phoneNumber || "Add a phone number"}
            </p>
          </div>
          <div>
            <p className="profile-details-header">Password</p>
            <p className="profile-details-data text-muted">Change password?</p>
          </div>
        <AccountModal />
        </div>
        <div className="profile-orders">
          <h2 className="profile-header">My orders</h2>
        </div>
      </div>
      <div className="profile-wishlist">
        <h2 className="profile-header">My wishlist</h2>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
