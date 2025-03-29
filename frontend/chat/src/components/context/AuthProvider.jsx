import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'

export const Authcontext= createContext();

export const AuthProvider = ({children}) => {
  const initialUserstate=Cookies.get("jwt") || localStorage.getItem("app");

  const [authUser, setauthUser]=useState(
    initialUserstate ? JSON.parse(initialUserstate):undefined
  );
  return (
    
      <Authcontext.Provider value={[authUser,setauthUser]}>
        {children}
      </Authcontext.Provider>
    
  )
};

export const useAuth = ()=> useContext(Authcontext);
