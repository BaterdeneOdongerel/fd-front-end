import React, { useState, useEffect } from 'react';
import { clearCart, getItemFromCart, removeItemFromCart, placeOrder, changeQuantityItemFromCart} from './../Utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";

const getTotalPrice = () => {
  let t = 0.0;
  const cart = getItemFromCart();
  const orders = (cart && cart['orders'] ) ? cart['orders'] : []; 
  for (let i = 0; i < orders.length; i ++ ) {
    t = t + 1 * orders[i]['meal'].price * orders[i]['amount'];
  }
  return t;
}

const PlacedOrder = () => {
  const cart = getItemFromCart();
  const orders = (cart && cart['orders'] ) ? cart['orders'] : []; 
  let Total_price = 0.0;
  
  for (let i = 0; i < orders.length; i ++ ) {
  	Total_price = Total_price + 1 * orders[i]['meal'].price * orders[i]['amount'];
  }

  clearCart();
  return (
    <div className="content">
      <div className="nav-line"></div>
        <h4 className="text-center"> Your order was successfully placed </h4>
        <h4 className="text-center"> total price of ${Total_price} items </h4>
        <div className="nav-line"></div>
    </div>   
  );
}


const EachRow = ({row, changed}) => {
  const total = () => {
    let v = row.amount * row.meal.price;
    return "$" + v.toString().slice(0,5);
  }

  const price = () => {
    return "$" + row.meal.price.toString().slice(0,5);
  }
  
  const decrease = ( ) => {
    if (row.amount > 1 ) {
      changeQuantityItemFromCart(row.id, row.meal, row.amount - 1);
      changed();
    }
  }

  const increase = ( ) => {
    changeQuantityItemFromCart(row.id, row.meal, row.amount + 1);
    changed();
  }

  const removeItem = ( ) => {
   changed();
   removeItemFromCart(row.id, row.meal);
  }

  return( 
    <tr> 
      <td >{row.id}</td>
      <td >{row.meal.name} </td>
      <td >
        <div>
          <div className="quantity-container">
            <div className="quantity-counter" style={{marginLeft:"0px"}}>
            <button className="btn btn-sm q-left" onClick={decrease}> - </button> 
            <label className="quantity-mid "> {row.amount } </label>
            <button className="btn btn-sm q-right" onClick={increase}> + </button>
            </div>
          </div>
        </div>
      </td>
      <td >{price()}</td>
      <td > {total()}</td>
      <td >
      <button type="button" className="btn btn-danger btn-sm" onClick={removeItem}> 
        <FontAwesomeIcon icon={faTrash} />
      </button>
      </td>
    </tr>
  );
}

export function RegularCheckout() {
  const [placedOrder, setPlacedOrder] = useState(false);
  return ( placedOrder ? <PlacedOrder/> : <ItemsInCart setPlacedOrder={setPlacedOrder}/>);
}

const ItemsInCart = ({setPlacedOrder}) => {

  const [cart, setCart] = useState({restaurantId: -1, orders: []});
  const [deleted, setDeleted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const scart = getItemFromCart();
    setCart(scart);
  }, [deleted] );

  const submitOrder = () => {
    if ( loading === false ){
      setLoading(true);
      const meals = cart.orders.map( (order) => { 
        return { id: order.meal.id , amount: order.amount}; 
        } 
      );
      placeOrder( cart.restaurantId, meals, setLoading, setPlacedOrder , setError);
    }
  } 

  if (cart.orders.length === 0) {
    return (
      <div className="content-checkout">
        <h3 className="text-center"> There is no item</h3>
        <div className="nav-line"></div>
      </div>
    );
  }

  return (
    <div className="content-checkout">
      <h3 className="text-center"> Items in your cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Meal </th>
            <th scope="col">QNTY</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          { cart.orders.map( (d) => <EachRow key={d.id} row={d} changed={ ()=> setDeleted(deleted + 1)}> </EachRow> ) }     
        </tbody>
      </table>
      
      <div style={{margin: "20px"}}>
        <div className="nav-line"></div>
        <div> 
          <div> Total Price: </div>
          <div>  ${getTotalPrice().toString().slice(0,5)}</div>
          <div style={{display: "inline-block", width: "100%"}}> 
            <button  onClick={submitOrder} className={"btn btn-success float-right" }> 
              Confirm your purchase 
            </button>
            {error && <small className="text-danger"> {error}</small>} 
          </div>
        </div> 
      </div>
    </div>
    );
}
