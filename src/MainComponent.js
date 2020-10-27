import React, { useState } from 'react';
import { BrowserRouter, Switch , Redirect} from 'react-router-dom';
import {RegularDashboard, RegularRestaurant, RegularOrder, RegularCheckout, CartModal} from './component';
import PublicRoute from './Utils/PublicRoute';
import { getToken, getUser, CorrectNavLinks , CorrectRoute, SignedInRoute} from './Utils';
import {
  AddRestaurant, 
  RestaurantDetail, 
  AddMeal ,
  OwnerOrder, 
  EditRestaurant,
  EditMeal,
  OwnerDashboard,
  BlockedUsers
} from './ower-component';
import {
  SignCommon, Signout
} from './sign-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const CartRight = () => {
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => {
    setShow(false);
  }

  return (
    <div style={{height: '65px'}}>
      <div  style={{position: "fixed", right: '10px'}}>
        <div className="btn btn-info border border-3 cart-button" onClick={()=> setShow(true)}>
          <FontAwesomeIcon size='3x'icon={faShoppingCart} />
        </div>
      </div>
      <CartModal show={show} handleClose={handleClose}></CartModal> 
    </div>
  );
}

export function MainComponent(props) {
  const user = getUser();
  const token = getToken();
  const isLoggedIn = () => {
    if( user && token) return true;
    return false;
  }
  const [loggedIn, setLoggedIn] = useState( isLoggedIn() );
  
  return (
      <BrowserRouter>
        <CorrectNavLinks/>
        { isLoggedIn() && <main>
          { (user && user.user_type == 1) &&  <CartRight/>}
          <HomeComponenetType setLoggedIn={setLoggedIn}/>
          <SignedInRoute  path="/login" component={SignCommon} setLoggedIn={setLoggedIn} />
        </main>
        }
        <PublicRoute  path="/login" component={SignCommon} setLoggedIn={setLoggedIn} />
        { !isLoggedIn() &&   
           <Redirect to={{ pathname: '/login' }}/>
        }
      </BrowserRouter>
  );
}


const HomeComponenetType = (props) => {
  const user = getUser();
  const token = getToken();

  if (user && token ) {
    if (user.user_type == 1) {
      return (
        <Switch>
          <CorrectRoute  rexact path="/logout" component={Signout} setLoggedIn={props.setLoggedIn} />
          <CorrectRoute  path="/restaurant/:id" component={RegularRestaurant} />
          <CorrectRoute  path="/orders" component={RegularOrder}/>
          <CorrectRoute  rexact path="/" component={RegularDashboard} />
         
        </Switch>
        );
    } else {
      return (
        <Switch>
          <CorrectRoute  path="/addrestaurant" component={AddRestaurant}/>
          <CorrectRoute  path="/restaurant/:id" component={RestaurantDetail}/>
          <CorrectRoute  path="/addmeal/:id" component={AddMeal}/>
          <CorrectRoute  path="/orders" component={OwnerOrder}/>
          <CorrectRoute  path="/editrestaurant/:id" component={EditRestaurant}/>
          <CorrectRoute  path="/editmeal/:restaurantId/:mealId/" component={EditMeal}/>
          <CorrectRoute  exact path="/" component={OwnerDashboard} />
          <CorrectRoute  rexact path="/logout" component={Signout} setLoggedIn={props.setLoggedIn} />
        </Switch>
        );
    }
  }
  return (<Redirect to={{ pathname: '/login' }}/>)
}


