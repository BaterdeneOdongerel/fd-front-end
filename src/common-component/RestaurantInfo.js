import React from 'react';
import { getUser} from './../Utils';
import { Link } from 'react-router-dom';

export const RestaurantInfo = ({ data , restaurantId}) => {
  
  const isOwner = () => {
    const v = getUser() && getUser().user_type === 2 ? true : false;
    return v;
  }

  return (
    <div>
      <h3 className="text-muted text-center text-capitalize" >
        {data.name}
      </h3>
      <div className="text-muted text-center">
        {data.description}
      </div>
      <div className="p-3">
        <span className="text-muted">Meal list</span>
        { isOwner() && <Link to={"/addmeal/" + restaurantId} className="btn btn-success float-right"> Add Meal</Link>}
      </div>
    </div>      
  );
}
