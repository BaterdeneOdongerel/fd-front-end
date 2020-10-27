import React, { useState } from 'react';
import { signUpHandle } from './../Utils';

export function Signup(props) {

  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const firstname = useFormInput('');
  const lastname = useFormInput('');
  const password = useFormInput('');
  const rePassword = useFormInput('');
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(1);

  const handleSubmit = () => {
    if (loading == false){ 
     const data = {
         firstname: firstname.value, 
         lastname: lastname.value, 
         username: username.value, 
         password: password.value, 
         confirm_password: rePassword.value,
         user_type: userType,
      }
    	setLoading(true);
      signUpHandle(data, setLoading, setError, props.setCurrent);
    }
  }

  const selectUserType = (event) => {
    console.log(event.target.value);
    setUserType(event.target.value);
  }
  return (
    <div>
      <h2> Sign Up</h2>
      <form>
        <div className="form-group">
          <input type="text" className="form-control" {...username} placeholder="username"/> 
        </div>
        <div className="form-group">
          <input type="text" className="form-control" {...firstname}  placeholder="Enter First Name"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" {...lastname}  placeholder="Enter Last Name"/>
        </div>
         <div className="custom-checkbox" onChange={selectUserType}>
        <input type="radio" value="1" name="gender"/> Regular User
        <input type="radio" value="2" name="gender"/> Owner
      </div>
        <div className="form-group">
          <input type="password" className="form-control" {...password}  placeholder="Enter password"/>
        </div>
         <div className="form-group">
          <input type="password" className="form-control" {...rePassword}  placeholder="Retype password"/>
        </div>
        <button onClick={handleSubmit} type="button" className="btn btn-info" > Sign Up </button>
        <button onClick={()=> props.setCurrent()} type="button" className="btn btn-outline-info float-right" > Login </button>
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
