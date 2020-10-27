import React from 'react';
import { getToken, getUser } from './Common';
import {  NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUtensils, faTasks, faDoorOpen} from "@fortawesome/free-solid-svg-icons";

const UserNameBar = () => {
  const user = getUser();
  return (
    <div>
      <div >
        <div>
          <i> 
            <FontAwesomeIcon icon={faUser} />
          </i>
          <i className="user-logged-in">
            {user.username} { user.user_type == 2 ? "(Admin owner)" : ""}
          </i>
        </div>
      </div>    
    </div>
  );
}

export const CorrectNavLinks = () => {
  const user = getUser();
  const token = getToken();
  if ( user && user.user_type == 1 && token) {
    return (
      <aside className="user">
        <header>
          <div className="logo">𝕱𝖔𝖔𝖉 𝕯𝖊𝖑𝖎𝖛𝖊𝖗𝖞</div>
          <UserNameBar/>
        </header>
        <nav className="user">
          <NavLink className="btn btn-info btn-block" activeClassName="active" to="/">
            <i> 
              <FontAwesomeIcon icon={faUtensils} />
            </i>
            {'  '}Restaurants
          </NavLink>    
          <NavLink activeClassName="active" className="btn btn-info btn-block" to="/orders">
            <i> 
              <FontAwesomeIcon icon={faTasks} />
            </i>
            {'  '}Order History
          </NavLink>
          <NavLink activeClassName="active" className="btn btn-info btn-block" to="/logout">
            <i> 
              <FontAwesomeIcon icon={faDoorOpen} />
            </i>
            {'  '}Logout
          </NavLink>
        </nav>
      </aside>
      );
  } else if (user && user.user_type == 2 && token ){
    return(
      <aside>
        <header>
          <div className="logo">𝕱𝖔𝖔𝖉 𝕯𝖊𝖑𝖎𝖛𝖊𝖗𝖞</div>
          <UserNameBar/>
        </header>
        <nav>
          <NavLink activeClassName="active" className="navItem" to="/">
            <i> 
              <FontAwesomeIcon icon={faUtensils} />
            </i>
            {'  '}Restaurants
          </NavLink>
          <NavLink activeClassName="active" className="navItem"  to="/orders">
            <i> 
              <FontAwesomeIcon icon={faTasks} />
            </i>
            {'  '}Orders
          </NavLink>
          <NavLink activeClassName="active" className="navItem"  to="/logout">
            <i> 
              <FontAwesomeIcon icon={faDoorOpen} />
            </i>
            {'  '}Logout
          </NavLink>
        </nav>
      </aside>
      );
  }
  return (
    <>

    </>   
  );
}
