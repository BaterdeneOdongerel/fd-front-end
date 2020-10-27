import React from 'react';
import ReactTooltip from 'react-tooltip';
import {FormatDate} from './../Utils';
const STATUS_LIST = [ 
      {status:1 , text: "PLACED"}, 
      {status:3 , text: "PROCESSING"}, 
      {status:4 , text: "IN ROUTE"}, 
      {status:5 , text: "DELIVERED"},
      {status:6 , text: "RECEIVED"} 
];

export const StatusBar = ({status}) => {
  if (status != 2 ){  
    return (
      <div>
        <div className="container">
          <div style={{width: '80%', marginTop: '20px'}}>
            <ul className="progressbar">
              { STATUS_LIST.map( (e)=> e.status <= status ? 
                <li data-tip data-for={"status-tool-tip" + e.status} key={e.status} className="active">{e.text}</li> : 
                <li data-tip data-for={"status-tool-tip" + e.status} key={e.status}>{e.text}</li> 
                )
              }
            </ul>
          </div>
        </div>      
      </div>
      );
  } else {
    return (
      <div>
        <div className="container">
          <div style={{width: '80%', marginTop: '20px'}}>
            <ul className="progressbar">
              <li data-tip data-for={"status-tool-tip1"} className="canceled">PLACED</li>
              <li data-tip data-for={"status-tool-tip2"} className="canceled">CANCELED</li>
            </ul>
          </div>
        </div>      
      </div>
      );
  }
}


export const ToolTipStatusForData = ({order_histories}) => {
  return(
    <div>
      {order_histories.map((oh) =>  
        <ReactTooltip key={oh.id} id={"status-tool-tip" + oh.order_status} effect="solid">
         {FormatDate(oh.created_at)}
      </ReactTooltip> )}
    </div>
    );
}

const MealTableRow = ({meal_order}) => {
  return(
    <tr> 
      <td>{meal_order.id}</td>
      <td>{meal_order.meal.name}</td>
      <td>{meal_order.amount}</td>
      <td>${meal_order.amount * meal_order.meal.price}</td>
    </tr>
    );
}

export const MealListTable = ({order_meals, total}) => {
  return (
    <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">name</th>
        <th scope="col">Amount</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody>
      { order_meals.map( d => <MealTableRow key={d.id} meal_order={d} > </MealTableRow> ) }
      <tr>
        <td ></td>
        <td ></td>
        <td >Total</td>
        <td >${total}</td>    
      </tr>
    </tbody>
    </table>
  );
}