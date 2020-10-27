import React, { useState } from 'react';
import {signInHandle } from './../Utils';

export function Signin(props) {
  
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const setRedirect = (redirectUrl) => {
  	props.history.push(redirectUrl);
  }

  const handleSubmit = () => {
    if (loading === false){
  	 setLoading(true);
  	 signInHandle(username.value, password.value, setLoading, setError, setRedirect, props.setLoggedIn);
    }
  }

  return (
    <div>
      <h2> Login </h2>
      <form>
        <div className="form-group">
          <input type="text" className="form-control" {...username} placeholder="username"/> 
        </div>
        <div className="form-group">
          <input type="password" className="form-control" {...password}  placeholder="Enter password"/>
        </div>
        <button onClick={handleSubmit} type="button" className="btn btn-info" > Login </button>
        <button onClick={()=> props.setCurrent()} type="button" className="btn btn-outline-info float-right" > Sign Up </button>
        <div className="text-center">
           {error && <small className="text-danger"> {error}</small>} 
        </div>
      </form>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
