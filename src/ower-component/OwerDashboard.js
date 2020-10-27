import React, { useState, useEffect } from 'react';
import { fetchRestaurantsOwner, deleteSingleRestaurant, RESTAURANT_ICONS} from './../Utils';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Cell = ({restaurant,  handleSelect, setData, restaurantList}) => {

  const handleSelectCell= (e) =>{
    handleSelect(restaurant.id);
  }

  const removeRestaurantData = () => {
    let newData = [];
    for (let i = 0; i < restaurantList.length; i ++ ) {
      if ( restaurantList[i].id != restaurant.id ) {
        newData.push( restaurantList[i] );
      }
    }
    setData(newData);
  }

  const setLoading = (e) => {

  }
  const setError = (e) => {

  }

  const deleteHandle = () => {
    deleteSingleRestaurant(restaurant.id, setLoading, removeRestaurantData, setError);
  }
  
  const submit = () => {
      confirmAlert({
      customUI: ({ onClose }) => {
        return (
            <div className='custom-confirm'>
                <h1>Are you sure?</h1>
                <p >You want to delete this Restaurant?</p>
                <button className="btn btn-success " onClick={onClose}>No</button>
                <button className="btn btn-danger float-right" onClick={() => {
                  onClose();
                  deleteHandle();
                  }}>
                  Yes
            </button>
      </div>
    );
  }
});


  };

  return (
    <div className="restaurant" >
      <div onClick={handleSelectCell}>
         <picture>
            <img src={RESTAURANT_ICONS[restaurant.id % 9]} alt="Flowers"/>
            </picture>
              <h2>{restaurant.name}</h2>
          </div> 
            <div>
              <Link type="button" className="btn btn-info btn-sm" to={"/editrestaurant/" + restaurant.id} > 
                 <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button onClick={submit} style={{float: "right"}} type="button" className="btn btn-danger btn-sm"> 
                 <FontAwesomeIcon icon={faTrash} />
              </button>
          </div>
     </div>
  );   
}

export function OwnerDashboard(props) {
  const perPage = 20;
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
     fetchRestaurantsOwner(setLoading, setCurrentData, setError, count, perPage);
  }, []);

  const loadMore = () => {
    if (loading === false && loadMore){
      setLoading(true);
      fetchRestaurantsOwner(setLoading, setCurrentData, setError, count, perPage);
    }
  }

  const handleSelect = (id) => {
    props.history.push("/restaurant/" + id);
  }
  return (
      <div>
        <div>
          <Link style={{marginLeft: "30px"}}  type="button" className="btn btn-success " to={"/addrestaurant/"} > 
          Add Restaurant
          </Link>
        </div>
        <div className="restaurantList">  
        { data.map( d => <Cell key={d.id} restaurant={d} setData={setData}  restaurantList={data} handleSelect={handleSelect} > </Cell> ) }     
    
        </div>
         <div className="ml-5">
           { loadMoreShow && <button onClick={loadMore} className="btn btn-info ">
             Load more 
          </button>}
              <div className="text-center">
                {error && <small className="text-danger"> {error}</small>} 
              </div>
        </div>
      </div>
  );
}


