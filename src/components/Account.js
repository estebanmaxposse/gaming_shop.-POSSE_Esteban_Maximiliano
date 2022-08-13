import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Account = () => {
    const {currentUser, logout} = useAuth();

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log("You're logged out");
        } catch (e) {
            console.log(e.message);
        };
    };
  return (
    <div>
      <h1>Your Account</h1>
      <p>Your email {currentUser && currentUser.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;