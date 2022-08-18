import React, { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

const UserContext = ({ children }) => {
  const { currentUser } = useAuth();

  let user = currentUser;
  if (!currentUser) {
    user = null;
  }

  const [shippingAddress, setShippingAddress] = useState(
    user?.shippingAddress || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  if (user) {
    user.shippingAddress = shippingAddress;
    user.phoneNumber = phoneNumber;
  }

  const value = {
    user,
    setPhoneNumber,
    setShippingAddress,
  };

  return <userContext.Provider {...{ value }}>{children}</userContext.Provider>;
};

export default UserContext;
