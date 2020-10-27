import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
function PublicRoute({ component: Component, setLoggedIn,  ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component setLoggedIn={setLoggedIn} {...props} /> : <Redirect to={{ pathname: '/' }} />}
    />
  )
}
 
export default PublicRoute;