import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const Account = () => {
    const {user, logout} = UserAuth();

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
      <p>Your email {user && user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
