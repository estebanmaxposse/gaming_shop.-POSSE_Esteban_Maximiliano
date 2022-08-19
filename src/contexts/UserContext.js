import React, { useState, useContext, createContext, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase/config";
import { async } from "@firebase/util";

const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

const UserContext = ({ children }) => {
  const { googleUser, userDetails, setUserDetails } = useAuth();
  
  const [user, setUser] = useState({});
  const [shippingAddress, setShippingAddress] = useState(
    user?.shippingAddress || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  useEffect(() => {
    if (!googleUser) {
      setUser(null);
    } else {
      if (user != null) {
      };
      setUser({
        ...user,
        ...googleUser,
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
      })
    }
  }, [googleUser, userDetails]);

  const fetchUserData = async (reload) => {
    console.log("fetch triggered");
    if (googleUser) {
      setUser({
        ...googleUser,
        ...(userDetails ?? {}),
      });
      
      if (!reload && userDetails) {
        reload = false;
        return;
      }

      const docRef = doc(db, "users", googleUser.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setUserDetails(docSnap.data());
          console.log(userDetails);
        }
        setUser({
          ...googleUser,
          ...userDetails,
        });
        console.log(user);
      });
    }
  };

  const updateUser = async (name, phoneNumber, shippingAddress) => {
    let userObj = { displayName: name };
    let userDetails = {}
    if (name) userDetails.displayName = name;
    if (phoneNumber) userDetails.phoneNumber = phoneNumber;
    if (shippingAddress) userDetails.shippingAddress = shippingAddress;
    const userRef = doc(db, "users", googleUser.uid);
    try {
      await updateProfile(googleUser, userObj);
      await updateDoc (userRef, userDetails).then(
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [googleUser, userDetails])
  
  const value = {
    user,
    setUser,
    phoneNumber,
    shippingAddress,
    fetchUserData,
    updateUser,
    setPhoneNumber,
    setShippingAddress,
  };

  return <userContext.Provider {...{value}}>{children}</userContext.Provider>;
};

export default UserContext;
