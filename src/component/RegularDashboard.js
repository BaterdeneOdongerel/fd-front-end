import React, { useState, useEffect } from 'react';
import { fetchRestaurants, RESTAURANT_ICONS} from './../Utils';

const customStyle = {
  width: "50%", marginLeft:"30px"
}

const Cell = (props) => {

  const handleSelect= () => {
    props.handleSelect(props.data.id);
  }

  return (
    <div className="restaurant" onClick={handleSelect}>
      <div>
        <picture>
          <img src={RESTAURANT_ICONS[props.data.id % 9]} alt="Flowers"/>
        </picture>
        <h2>{props.data.name}</h2>
      </div> 
      <div>
        {props.data.description}
      </div>
    </div>
  );   
}

export function RegularDashboard(props) {

  const perPage = 16;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMoreShow, setLoadMoreShow] = useState(true);
  const [error, setError] = useState("")
  
  const setCurrentData = (responseData) => {
    if (responseData && responseData.length < perPage) {
      setLoadMoreShow(false);
    }
    let arrayData = [...data, ...responseData];
    setData(arrayData);
    setCount(arrayData.length);
  }

  useEffect(() => {
     fetchRestaurants(setLoading, setCurrentData, setError, count, perPage);
  }, []);

  const loadMore = () => {
    if (loading === false && loadMore){
      setLoading(true);
      fetchRestaurants(setLoading, setCurrentData, setError, count, perPage);
    }
  }

  const handleSelect = (id) => {
    props.history.push("/restaurant/" + id);
  }

  return (
    <div>
      <div style={customStyle}>
        <input type="text" className="form-control" placeholder="Search for meal or restaurant"/> 
      </div>
      <div className="restaurantList">  
        { data.map( d => <Cell key={d.id} data={d} handleSelect={handleSelect}> </Cell> ) }     
      </div>
      <div className="ml-5">
        { loadMoreShow && 
          <button onClick={loadMore} className="btn btn-info ">
             Load more 
          </button> }
        <div className="text-center">
          {error && <small className="text-danger"> {error}</small>} 
        </div>
      </div>
    </div>
  );
}