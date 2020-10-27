import React, { useState, useEffect } from 'react';
import { fetchMeals, addItemToCart, fetchSingleRestaurantsRegular} from './../Utils';
import Modal from 'react-modal';
import { RestaurantInfo} from './../common-component';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-40%',
    transform             : 'translate(-50%, -50%)',
    width: '400px', 
  }
};

const OrderModal = (props) => {
  const [amount, setAmount] = useState(1);
  const selectedOrder = props.selectedOrder;
  const restaurantId = props.restaurantId;
  
  useEffect(() => {
    setAmount(1);  
  },[props.selectedOrder]);

  const addItemToCartFromOrder = () => {
    if ( amount > 0 ) {
      addItemToCart(restaurantId, selectedOrder, amount);
      props.handleClose();
    }
  }
  const currentPrice = () => {
    if (selectedOrder){ 
     let v = amount * selectedOrder.price;
     return "$ " + v.toString().slice(0,5); 
    } 
    return "";
  }
  return (
    <Modal
    isOpen={selectedOrder != null } 
    onRequestClose={props.handleClose}
    style={customStyles}
    contentLabel="Example Modal"
    ariaHideApp={false}
    >
      <button type="button" className="close" data-dismiss="modal" onClick={props.handleClose} >&times;</button>
      <h1> { selectedOrder && selectedOrder.name  } </h1>
      <h5> ${ selectedOrder && selectedOrder.price  } </h5>
      <div className="nav-line"></div>
      <div> { selectedOrder && selectedOrder.description} </div>
    
      <div>
        <div className="quantity-container">
          Quantity 
          <div className="quantity-counter">
          <button onClick={ ()=> setAmount( amount > 2 ? amount - 1 : 1)} className="btn btn-sm q-left"> - </button> 
          <label className="quantity-mid ">{amount}</label>
          <button className="btn btn-sm q-right" onClick={ ()=> setAmount(amount + 1)}> + </button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="nav-line"></div>
        <button onClick={props.handleClose} className="btn btn-warning"> Exit </button>
        <button onClick={addItemToCartFromOrder} className={"btn btn-primary float-right custom" }> Add to the cart ({ currentPrice() })</button>
      </div>  
    </Modal>  
  );  
}

const Cell = (props) => {
  const popUpOrderWindow = () => {
    props.setSelectedOrder(props.data)
  }
  return (
    <tr> 
      <td >{props.data.id}</td>
      <td >icon </td>
      <td >{props.data.name }</td>
      <td >{props.data.description}</td>
      <td >{props.data.price.toString().slice(0,5)}</td>
      <td >
      <button type="button" onClick={popUpOrderWindow}  className="btn btn-success btn-sm"> select </button>
      </td>
    </tr>
  );   
}

export function RegularRestaurant(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([])
  const [restData , setRestData] = useState({name: "", description: ""});
  const [selectedOrder, setSelectedOrder] = useState( null );
  
  const restaurant_id = props.match.params.id;
  useEffect(() => {
    if ( restaurant_id &&  restaurant_id > 0 && loading === false )
      fetchSingleRestaurantsRegular(restaurant_id, setLoading, setRestData, setError );
      fetchMeals(restaurant_id, setLoading, setData, setError);
  },[]);

  const handleClose = () => {
    setSelectedOrder(null);
  }

  return (
    <div className="content">
      <RestaurantInfo data={restData} restaurantId={restaurant_id}/>
      <h2>Available Meals</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Icon</th>
            <th scope="col">Name</th>
            <th scope="col">Desc</th>
            <th scope="col">Price</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
          { data.map( d => <Cell key={d.id} data={d} setSelectedOrder={setSelectedOrder} > </Cell> ) }    
        </tbody>
     </table>
      {error && <small className="text-danger"> {error}</small>} 
      <OrderModal restaurantId = {restaurant_id} selectedOrder={selectedOrder} handleClose={handleClose}></OrderModal> 
    </div>
  );
}