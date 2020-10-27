import React from 'react';
import { updateNextStatus, FormatDate} from './../Utils';
import Modal from 'react-modal';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {StatusBar, ToolTipStatusForData, MealListTable} from './CommonItems'
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-40%',
    transform             : 'translate(-50%, -50%)',
    width: 'auto', 
  }
};

const STATUS_TEXT = { 
  '1': "PLACED", 
  '2': "CANCELED", 
  '3': "PROCESSING", 
  '4': "IN ROUTE" , 
  '5': "DELIVERED", 
  '6': "RECEIVED", 
  '0': "UNCHANGEABLE"
};

const MealMoreDetail = ({restaurant, user, date}) => {
  return (
      <div>
        <div className="nav-line"></div>
        <div>
          <div><h5>{user.username} {user.firstname} {user.lastname}<kbd className="display-6 float-right"><small>{FormatDate(date)}</small></kbd></h5></div> 
          <div><h5> {restaurant.name} </h5></div>
        </div>
      </div>
  );
}

export const OrderDetails = (props) => {
  const isOwner = props.isOwner;
  const currentStatus = props.data.status;

  const getNextStatus = () => {
    return STATUS_TEXT[getNextStatusId()];
  }
  
  const getNextStatusId = () => {
    let answer = -1;
    if ( isOwner ) {
      if ( currentStatus === 1 || currentStatus === 3 ||  currentStatus === 4 ) {
        answer = currentStatus + 1;
        if (currentStatus === 1) answer ++;
        return answer;
      }
    } else {
      if (currentStatus === 1) {
        return 2;
      }
      if (currentStatus === 5) {
        return 6;
      }
    }
    return 0;
  }

  const newIdOrderHistroy = () => {
    if( props.data && props.data.order_histories) {
      const len = props.data.order_histories.length;
      return props.data.order_histories[len - 1].id + 1; 
    }
    return 1;
  }

  const pushCurrentTimeInStatusBar = () => {
    let order_histories = props.data.order_histories;
    if (order_histories) {
      order_histories.push({id: newIdOrderHistroy(), order_status: getNextStatusId(), created_at: String(new Date()) });
    }
    return order_histories;
  }

  const statusUpdatedSuccess = () => {
    const newOrderList =[];
    for (let i = 0; i < props.orderList.length; i ++ ) {
      if (props.orderList[i].id === props.data.id) {
        props.data.status = getNextStatusId();
        props.data.order_histories = pushCurrentTimeInStatusBar();
        newOrderList.push(props.data);
      } else {
        newOrderList.push(props.orderList[i]);
      }
    }
    props.setOrderList(newOrderList);
  }

  const markNextStatus = () => {
    if ( getNextStatusId() !== 0 ){
      updateNextStatus( isOwner, props.data.id, getNextStatusId() , (e)=> {},  statusUpdatedSuccess, (e)=> {} );
    }
  }
  
  const statusButtonClass = () => {
    let status = getNextStatusId();
    if ( status === 2 ) {
      return "btn btn-danger";
    }
    if (status === 0 || status === -1 ) {
      return "btn btn-default";
    }
    return "btn btn-success";
  }

  const statusButtonText = () => {
    let status = getNextStatusId();

    if ( status === -1 || status === 0 ) {
      return "" + getNextStatus() ;
    }
    return "MARK AS " + getNextStatus() ;
  }
 return (
    <Modal
    isOpen={ props.data !== null } 
    onRequestClose={props.handleClose}
    style={customStyles}
    contentLabel="Example Modal"
    ariaHideApp={false}
  >
      <StatusBar status={props.data.status}/>
      <ToolTipStatusForData order_histories={props.data.order_histories} />
      <MealListTable order_meals={props.data.order_meals} total ={props.data.total} />  
      <MealMoreDetail restaurant={props.data.restaurant} user={props.data.user} status={props.data.status} date={props.data.created_at}/>
      <div>
        <button onClick={props.handleClose} className="btn btn-warning"> Exit </button>
        <button onClick={markNextStatus} className={statusButtonClass() + " float-right" }> {statusButtonText()} </button>
      </div>
  </Modal>  
  );  
}

const STATUS_TAG_HASH = {
  '1' :  <span className="badge badge-secondary">Placed</span>,
  '2' :  <span className="badge badge-danger">Canceled</span>,
  '3' :  <span className="badge badge-success">Processing</span>,
  '4' :  <span className="badge badge-success">In Route</span>,
  '5' :  <span className="badge badge-success">Delivered</span>,
  '6' :  <span className="badge badge-warning">Recieved</span>,
  '0' :  <span className="badge badge-secondary">Secondary</span>,
  '-1' : <span className="badge badge-secondary">Secondary</span>
  
};
export const TableRow = (props) => {
  return (
    <tr> 
      <td>{props.data.id}</td>
      <td>{props.data.restaurant.name } </td>
      <td>{props.data.user.username }</td>
      <td>${props.data.total.toString().slice(0,5)}</td>
      <td> { STATUS_TAG_HASH[props.data.status] } </td>
      <td>
        <button onClick={ ()=> props.setDetailData(props.data) } type="button" className="btn btn-info btn-sm" > 
           <FontAwesomeIcon icon={faEye} /> 
        </button>
        </td>
    </tr>
  );   
}