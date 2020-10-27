import React, { useState } from 'react';
import {Signup} from './Signup'
import {Signin} from './Signin'

export function SignCommon(props) {
  const [current, setCurrent] = useState("signin");
 
  return (
    <div className="login-container">
      {current === "signup" ? <Signup setCurrent ={()=> setCurrent('signin')}/> : <Signin setCurrent ={()=> setCurrent('signup')} {...props}/> }
    </div>
  );
}