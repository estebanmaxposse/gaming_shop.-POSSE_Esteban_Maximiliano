import React, { useState, useEffect, useContext, createContext } from "react";

const notifContext = createContext();

export const useNotif = () => {
  return useContext(notifContext);
};

const NotifContext = ({ children }) => {
  const [alert, setAlert] = useState({
    isAlert: false,
    variant: "info",
    message: "",
  });

  return (
    <notifContext.Provider value={{ alert, setAlert }}>
      {children}
    </notifContext.Provider>
  );
};

export default NotifContext;
