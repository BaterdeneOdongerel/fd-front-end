import React, { useState } from 'react';
import {createMealOwner} from './../Utils';
import { Link } from 'react-router-dom';

export function AddMeal(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const restaurantId = props.match.params.id;
  
  const handleName = (e) => {
    setName(e.target.value)
  }
  
  const handleDesc = (e) => {
    setDesc(e.target.value)
  }
  
  const handlePrice= (e) => {
    setPrice(e.target.value)
  }
  
  const setFinished = (success) => {
    if (success) {
      props.history.push('/restaurant/' + restaurantId)
    }
  }

  const handleSubmit =() => {
    if (loading === false){
      setLoading(true);
      createMealOwner(restaurantId, name, desc, price, setLoading, setError, setFinished);
    }
  }
  return (
    <div className="content">
      <div style={{margin:"30px", width: "50%"}}>
        <h2> Add Meal</h2>
        <form>
          <div className="form-group">
            <label >Meal Name</label>
            <input type="text" className="form-control"  name="name" value={name} onChange={handleName} placeholder="Enter meal name"/> 
          </div>
          <div className="form-group">
            <label >Description</label>
            <input type="text" className="form-control"  name={desc} value={desc} onChange={handleDesc} placeholder="Description"/>
            <small id="emailHelp" className="form-text text-muted">Berief description about the meal and ingredients</small>
          </div>
           <div className="form-group">
          <label >Price</label>
            <input type="number" className="form-control"  name={price} value={price}onChange={handlePrice} placeholder="Description"/>
          </div>
           <Link type="button" className="btn btn-info" to={"/restaurant/" + restaurantId}> Back </Link> 
           <button onClick={handleSubmit} type="button" className="btn btn-info float-right" > Submit </button>
            <div className="text-center">
            {error && <small className="text-danger"> {error}</small>} 
          </div>
        </form>
      </div>
    </div>
  );
}

