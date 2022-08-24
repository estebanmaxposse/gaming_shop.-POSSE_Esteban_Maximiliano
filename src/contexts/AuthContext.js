import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import React, { useState, useContext, createContext, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const database = db;
        setDoc(doc(database, "users", userCredential.user.uid), {
          id: userCredential.user.uid,
          displayName: userCredential.user.displayName || "",
          email: userCredential.user.email,
          phoneNumber: "",
          shippingAddress: "",
        });
      }
    );
  };

  const logout = () => {
    return signOut(auth);
  };

  const [userDetails, setUserDetails] = useState();

  const postUserDetails = (userInfo) => {
    const docRef = doc(db, "users", userInfo.uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        setUserDetails({
          id: userInfo.uid,
          displayName: userInfo.displayName,
          email: userInfo.email,
        });
        const database = db;
        setDoc(doc(database, "users", userInfo.uid), userDetails);
      }
    });
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        postUserDetails(userCredential.user);
      }
    );
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then((userCredential) => {
      postUserDetails(userCredential.user);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (googleUser) => {
      setGoogleUser(googleUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    googleUser,
    userDetails,
    setUserDetails,
    signUp,
    logout,
    login,
    loginGoogle,
    loading,
    setLoading,
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
