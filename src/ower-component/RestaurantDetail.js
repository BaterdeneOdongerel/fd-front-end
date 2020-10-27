import React, { useState, useEffect } from 'react';
import { fetchMealsByRestaurant, fetchSingleRestaurants,deleteSingleMeal} from './../Utils';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import { RestaurantInfo} from './../common-component';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {BlockedUsers} from './BlockedUsers'

const Cell = ({meal, mealList, restaurantId, setData}) => {
  const removeMealData = () => {
    let newData = [];
    for (let i = 0; i < mealList.length; i ++ ) {
      if ( mealList[i].id !== meal.id ) {
        newData.push( mealList[i] );
      }
    }
    setData(newData);
  }
  const setLoading = (e) => {

  }
  const setError = (e) => {

  }

  const handleDelete = () => {
    deleteSingleMeal(meal.id, setLoading, removeMealData , setError);
  }

  const submit = () => {
      confirmAlert({
      customUI: ({ onClose }) => {
        return (
            <div className='custom-confirm'>
                <h1>Are you sure?</h1>
                <p >You want to delete this Meal?</p>
                <button className="btn btn-success " onClick={onClose}>No</button>
                <button className="btn btn-danger float-right" onClick={() => {
                  onClose();
                  handleDelete();

                }}>Yes</button>
      </div>
      );
    }
  });
  };

  return (
    <tr> 
      <td>{meal.id}</td>
      <td>icon </td>
      <td>{meal.name }</td>
      <td>{meal.description}</td>
      <td>${String(meal.price).slice(0,5)}</td>
      <td>
        <Link type="button" className="btn btn-info btn-sm" to={"/editmeal/" + restaurantId + "/" + meal.id} > 
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <button onClick={submit} type="button" className="btn btn-danger btn-sm ml-1">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );   
}

const BLOCK_USER_TEXT = { 'true': 'Hide user board', 'false': 'Show users board' };

export function RestaurantDetail(props) {

  const [blockShow, setBlockShow] = useState(false);
  const [data, setData] = useState([]);
  const [restData , setRestData] = useState({name: "", description: ""});
  const restaurantId = props.match.params.id;
  
  useEffect(() => {
    fetchSingleRestaurants(restaurantId, (e)=>{}, setRestData, (e)=>{} );
    fetchMealsByRestaurant(restaurantId, (e)=>{}, setData, (e)=>{});
  }, []);

  return (
  <div className="content">
    <div className="nav-line"></div>
    <RestaurantInfo data={restData} restaurantId={restaurantId}/>
    <table className="table table-striped mt-2">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Icon</th>
          <th scope="col">Name</th>
          <th scope="col">Desc</th>
          <th scope="col">Price</th>
          <th scope="col">See</th>
        </tr>
      </thead>
      <tbody>
        { data.map( d => <Cell key={d.id} mealList={data} setData={setData} meal={d} restaurantId={restaurantId} > </Cell> ) }    
      </tbody>
    </table>
    <button type="button" className="btn btn-info btn-block" onClick={ ()=> setBlockShow(!blockShow)}> 
      {BLOCK_USER_TEXT[blockShow]} 
    </button>
    { blockShow && <BlockedUsers restaurantId={restaurantId}/>}
  </div>
  );
}

