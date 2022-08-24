import React, { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  updateEmail,
  updateProfile,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

const UserContext = ({ children }) => {
  const { googleUser, userDetails, setUserDetails, logout, setLoading } =
    useAuth();

  const [user, setUser] = useState({});
  const [shippingAddress, setShippingAddress] = useState(
    user?.shippingAddress || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!googleUser) {
      setUser(null);
    } else {
      if (user != null) {
      }
      setUser({
        ...user,
        ...googleUser,
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
      });
    }
  }, [googleUser, userDetails]);

  const fetchUserData = async (reload) => {
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
          setUserDetails(docSnap.data());
        }
        setUser({
          ...googleUser,
          ...userDetails,
        });
      });
    }
  };

  const updateUser = async (
    name,
    phoneNumber,
    shippingAddress,
    email,
    password
  ) => {
    let userObj = { displayName: name };
    let userEmail = email;
    let userPassword = password;
    let userDetails = {};
    if (name) userDetails.displayName = name;
    if (phoneNumber) userDetails.phoneNumber = phoneNumber;
    if (shippingAddress) userDetails.shippingAddress = shippingAddress;
    if (email) userDetails.email = email;
    const userRef = doc(db, "users", googleUser.uid);
    try {
      await updateProfile(googleUser, userObj);
      await updateEmail(googleUser, userEmail);
      await updatePassword(googleUser, userPassword);
      await updateDoc(userRef, userDetails);
      toast.success("Profile successfully updated!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/requires-recent-login).") {
        toast.error("Connection timed out!", {
          position: toast.POSITION.TOP_CENTER,
        });
        toast.onChange((payload) => {
          if (
            payload.status === "removed" &&
            payload.type === toast.TYPE.ERROR
          ) {
            logout();
            navigate("/login");
          }
        });
      } else {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [googleUser, userDetails]);

  const deleteUserProfile = async () => {
    setLoading(true);
    try {
      await deleteUser(googleUser);
      await deleteDoc(doc(db, "users", googleUser.uid));
      toast.success("Account deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.onChange((payload) => {
        if (
          payload.status === "removed" &&
          payload.type === toast.TYPE.SUCCESS
        ) {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/requires-recent-login).") {
        toast.error("Connection timed out!", {
          position: toast.POSITION.TOP_CENTER,
        });
        toast.onChange((payload) => {
          if (
            payload.status === "removed" &&
            payload.type === toast.TYPE.ERROR
          ) {
            logout();
            navigate("/login");
          }
        });
      }
    }
    setLoading(false);
  };

  const value = {
    user,
    setUser,
    phoneNumber,
    shippingAddress,
    fetchUserData,
    updateUser,
    setPhoneNumber,
    setShippingAddress,
    deleteUserProfile,
  };

  return <userContext.Provider {...{ value }}>{children}</userContext.Provider>;
};

export default UserContext;
