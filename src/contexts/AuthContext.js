import React, { useEffect, useState, useContext, createContext, useMemo } from "react";
import jwt_decode from "jwt-decode";
import env from "react-dotenv";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //SESSION MANAGER
  const [userToken, setUserToken] = useState(null); // string or nil
  const userDecodedToken = useMemo(() => userToken && jwt_decode(userToken), [userToken]); // user object or nil
  const isAuthenticated = useMemo(() => !!userToken, [userToken]); // boolean
  const [user, setUser] = useState(null);

  const [, setTokenIntervalPromise] = useState();
  
  useEffect(() => {
    if (!userDecodedToken) {
      return;
    }

    const expirationTime = userDecodedToken.exp * 1000; // convert expiration time to milliseconds
    const timeout = expirationTime - Date.now();  // Calculate in how many milliseconds will the token expire

    setTokenIntervalPromise(
      prev => {
        prev && clearInterval(prev);  // Stop previous interval from running

        const newInterval = setInterval(
          () => {
            clearInterval(newInterval);
            if (!isAuthenticated) {
              return;
            }
            logout();
          }, 
          timeout
        );

        return newInterval;
      }
    )
  }, [userDecodedToken])

  //METHODS
  const signUp = async (email, password, username, fullName, phoneNumber, shippingAddress, age, avatar) => {
    fetch(env.API_URL + '/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, username: username, fullName: fullName, phoneNumber: phoneNumber, shippingAddress: shippingAddress, age: age, avatar: avatar })
    })
      .then(response => {
        return response.json();
      })
      .then(token => {
        localStorage.setItem('token', token);
        setUserToken(token);
        let decoded = (jwt_decode(token));
        console.log(decoded);
        setUser(decoded.user);
        console.log(`SIGN UP`, user);
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  const login = async (email, password) => {
    await fetch(env.API_URL + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(async response => {
      let data = await response.json();
      return data
    })
    .then(token => {
      localStorage.setItem('token', token);
      setUserToken(token)
      let decoded = (jwt_decode(token));
      setUser(decoded.user);
      console.log(`LOGIN`, user);
      })
    .catch(error => {
      console.error(error);
    });
  };
  
  const logout = async () => {
    localStorage.removeItem('token');
    setUserToken(null);
    setUser(null);
    console.log(`LOGOUT`, user);
    navigate('/login');
  }
  
  const updateUser = async (email, username, fullName, phoneNumber, shippingAddress, age, avatar) => {
    let userPayload = {
      email: email,
      username: username,
      fullName: fullName,
      phoneNumber: phoneNumber,
      shippingAddress: shippingAddress,
      age: parseInt(age),
      avatar: avatar
    }
    let filteredUser = Object.entries(userPayload).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
    const newUser = {...user, ...filteredUser};
    setUser({...user, ...filteredUser});
    setUser(newUser);
    await fetch(env.API_URL + '/api/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      'body': JSON.stringify({ user: newUser })
    })
    .then(async response => {
      return await response.json()
    })
    .then(async data => {
      console.log('RESPONSE ', data);
    })
    .then(toast.success("Profile successfully updated!", {
      position: toast.POSITION.TOP_CENTER,
    }))
    .catch(error => {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    });
  }
  
    const value = {
      user,
      signUp,
      logout,
      login,
      updateUser,
      loading,
      setLoading,
      isAuthenticated,
    };
    return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
  };
  
  export default AuthContext;