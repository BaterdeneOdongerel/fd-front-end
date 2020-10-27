import React, { useEffect} from 'react';
import {signOut,removeUserSession } from './../Utils';

export const Signout = (props) => {
  
  useEffect(() => {
  	signOut((e)=>{} , (e) => {});
    props.setLoggedIn(false);
    removeUserSession();
  });

  return (
    <div className="login-container">
  		LogOut				   
    </div>
  );
}