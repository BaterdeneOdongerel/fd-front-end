import React, { useState, useEffect } from 'react';
import { fetchUsersRestaurants, blockUserRestaurant} from './../Utils';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock} from "@fortawesome/free-solid-svg-icons";

const cloneUserData = (user) => {
  let newObj = {};
  Object.keys(user).forEach(function(key) {
     newObj[ key ] = user[ key ];
  });
  return newObj; 
}

const Cell = ({ user, restaurantId}) => {
  const [userData,  setUserData] = useState(user);

  const setData = () => {
    let newUser = cloneUserData(userData);
    newUser.blocked = !newUser.blocked;
    setUserData(newUser);
  }
  const setError = (e) => {

  }
  const setLoading = (e) => {

  }
  const handleBlockSubmit = () => {
    blockUserRestaurant(restaurantId, user.id , true, setLoading, setData, setError);
  }

  const handleUnBlockSubmit = () => {
    blockUserRestaurant(restaurantId, user.id , false, setLoading, setData, setError);
  }

  return (
    <tr> 
      <td >{userData.username}</td>
      <td >{userData.firstname}</td>
      <td >{userData.lastname }</td>
      <td>
        { !userData.blocked ?
          <button type="button" className="btn btn-info btn-sm" onClick={handleBlockSubmit}> 
           <FontAwesomeIcon icon={faLockOpen} />
          </button> :
          <button type="button" className="btn btn-danger btn-sm" onClick={handleUnBlockSubmit} > 
            <FontAwesomeIcon icon={faLock} />
          </button>
        }
      </td>
    </tr>
  );   
}

export function BlockedUsers({restaurantId}) {
  const perPage = 10;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMoreShow, setLoadMoreShow] = useState(true);
  const [error, setError] = useState("");
  const [detailData, setDetailData] = useState(null);
  
  const setCurrentData = (responseData) => {
    if (responseData && responseData.length < perPage) {
      setLoadMoreShow(false);
    }
    let arrayData = [...data, ...responseData];
    setData(arrayData);
    setCount(arrayData.length);
  }

  const loadMore = () => {
    if (loading === false && loadMore){
      setLoading(true);
      fetchUsersRestaurants(restaurantId,setLoading, setCurrentData, setError, count, perPage);
    }
  }

  useEffect(() => {
    fetchUsersRestaurants(restaurantId,setLoading, setCurrentData, setError, count, perPage);
  }, [restaurantId]);
  
  return (
    <div style={{width: '50%', borderRadius: "5px"}}>
      <div className="nav-line"></div>
      <h2>Block users</h2>

      <table className="table table-dark table-sm rounded-sm">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Fname</th>
            <th scope="col">Lname</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          { data.map( (user)=> <Cell key={user.id} user={user} restaurantId={restaurantId} > </Cell> ) }    
        </tbody>
      </table>
       <div className="ml-5">
          { loadMoreShow && <button onClick={loadMore} className="btn btn-info ">Load more </button>}
            <div className="text-center">
              {error && <small className="text-danger"> {error}</small>} 
            </div>
      </div>
      <div className="nav-line"></div>     
    </div>
  );
}

