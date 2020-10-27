import React, { useState } from 'react';
import {createRestaurantsOwner} from './../Utils';
import { Link , withRouter} from 'react-router-dom';



export function AddRestaurant(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleName = (e) => {
    setName(e.target.value)
  }
  
  const handleDesc = (e) => {
    setDesc(e.target.value)
  }
  
  const setFinished = (success) => {
    if (success) {
      props.history.push('/');
    }
  }

  const handleSubmit =() => {
    if(loading === false){
      setLoading(true);
      createRestaurantsOwner(name, desc, setLoading, setError, setFinished);
    }
  }
  return (
    <div className="content">
      <div style={{margin:"30px", width: "50%"}}>
        <h2> Add Restaurant</h2>
        <form>
          <div className="form-group">
            <label >Restaurant Name</label>
            <input type="text" className="form-control" id="restaurantName" name="name" value={name} onChange={handleName} placeholder="Enter restaurant name"/> 
          </div>
          <div className="form-group">
            <label >Description</label>
            <input type="text" className="form-control" id="description" name={desc} value={desc} onChange={handleDesc} placeholder="Description"/>
            <small id="emailHelp" className="form-text text-muted">Berief description about the restaurant and it's service</small>
          </div>
          <Link type="button" className="btn btn-info" to={"/"}> Back </Link> 
          <button onClick={handleSubmit} type="button" className="btn btn-info float-right" > Submit </button>
          <div className="text-center">
            {error && <small className="text-danger"> {error}</small>} 
          </div>
        </form>
      </div>
      <div className="nav-line"></div>     
    </div>
  );
}

export default withRouter(AddRestaurant );