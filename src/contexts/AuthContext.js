// import {
//   createUserWithEmailAndPassword,
//   signOut,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
import React, { useState, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";
import env from "react-dotenv";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase/config";
// import { setDoc, doc, getDoc } from "firebase/firestore";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  // const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
        console.log(token);
        localStorage.setItem('token', token);
        let decoded = (jwt_decode(token));
        console.log(decoded);
        setUser(decoded.user);
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  const login = async (email, password) => {
    // console.log('LOGIN');
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
      let decoded = (jwt_decode(token));
      setUser(decoded.user);
      })
    .catch(error => {
      console.error(error);
    });
  };
  
  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }
  
  const fetchUserData = async () => {
    await fetch(env.API_URL + '/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
    .then(async response => {
      return await response.json()
    })
    .then(data => {
      console.log('FETCH ', data);
      setUser(data.user);
      return data.user;
    })
  }
  
  const updateUser = async (email, username, fullName, phoneNumber, shippingAddress, age, avatar) => {
    let userPayload = {
      email: email,
      // password: password,
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


    console.log('FRONTEND USER: ', newUser);
    console.log(JSON.stringify({ user: newUser }));
    
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
      // googleUser,
      // userDetails,
      // setUserDetails,
      signUp,
      logout,
      login,
      updateUser,
      fetchUserData,
      // loginGoogle,
      loading,
      setLoading,
    };
    return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
  };
  
  export default AuthContext;
  
  // return signInWithEmailAndPassword(auth, email, password).then(
    //   (userCredential) => {
      //     postUserDetails(userCredential.user);
      //   }
      // );

      // const loginGoogle = async () => {
        //   const provider = new GoogleAuthProvider();
        //   return signInWithPopup(auth, provider).then((userCredential) => {
          //     postUserDetails(userCredential.user);
          //   });
          // };
          
          // useEffect(() => {
            //   const unsubscribe = onAuthStateChanged(auth, (googleUser) => {
              //     setGoogleUser(googleUser);
              //   });
              //   return () => {
                //     unsubscribe();
                //   };
                // }, []);
                
                // const logout = () => {
                //   return signOut(auth);
                // };
              
                // const [userDetails, setUserDetails] = useState();
              
                // const postUserDetails = (userInfo) => {
                //   const docRef = doc(db, "users", userInfo.uid);
                //   getDoc(docRef).then((docSnap) => {
                //     if (docSnap.exists()) {
                //       setUserDetails(docSnap.data());
                //     } else {
                //       setUserDetails({
                //         id: userInfo.uid,
                //         displayName: userInfo.displayName,
                //         email: userInfo.email,
                //       });
                //       const database = db;
                //       setDoc(doc(database, "users", userInfo.uid), userDetails);
                //     }
                //   });
                // };