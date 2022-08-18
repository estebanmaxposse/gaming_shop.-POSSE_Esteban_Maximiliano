import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState, useContext, createContext, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { collection, setDoc, doc } from "firebase/firestore";

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};


const AuthContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const database = db;
        setDoc(doc(database, "users", userCredential.user.uid), {
          id: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          phoneNumber: "",
          shippingAddress: ""
        });
      }
    );
  };

  const logout = () => {
    return signOut(auth);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then((userCredential) => {
      const database = db;
      setDoc(doc(database, "users", userCredential.user.uid), {
        id: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        phoneNumber: "",
        shippingAddress: ""
      });
    });
  };

  let user = currentUser;
  if (!currentUser) {
    user = null;
  };
  console.table(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const value = {
    currentUser,
    signUp,
    logout,
    login,
    loginGoogle,
    loading,
    setLoading,
    user,
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
