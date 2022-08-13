import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState, useContext, createContext, useEffect } from 'react';
import { auth } from '../firebase/config';

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

const AuthContext = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    const value = {
        currentUser,
        signUp,
        logout,
        login,
        loginGoogle
    };
  return (
    <authContext.Provider {...{value}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthContext