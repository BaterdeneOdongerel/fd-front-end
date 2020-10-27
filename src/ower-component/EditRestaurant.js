import React, { useState, useEffect } from 'react';
import {fetchSingleRestaurants, updateRestaurantsOwner} from './../Utils';
import { Link } from 'react-router-dom';

export function EditRestaurant(props) {

  const [id, setId] = useState(-1);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const restaurantId = props.match.params.id;
  
  const handleName = (e) => {
    setName(e.target.value)
  }
  
  const handleDesc = (e) => {
    setDesc(e.target.value)
  }
  
  const setFinished = (success) => {
    if (success) {
      props.history.push('/')
    }
  }

  const handleSubmit =() => {
    if (loading=== false){
      setLoading(true);
      updateRestaurantsOwner(id, name, desc, setLoading, setError, setFinished);
    }
  }

  const setData = (data) => {
    setId(data.id);
    setName(data.name);
    setDesc(data.description);
  }

  useEffect(() => {
    fetchSingleRestaurants( restaurantId, setLoading, setData, setError );
  }, []);

  return (
    <div className="content">
      <div style={{margin:"30px", width: "50%"}}>
        <h3> Edit Restaurant</h3>
        <form>
          <input type="hidden" name="name" placeholder="Name" value={id}/>
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
    </div>
  );
}