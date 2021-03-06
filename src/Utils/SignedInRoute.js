import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken, getUser } from './Common';
 
export function SignedInRoute({ component: Component, setLoggedIn, ...rest }) {
  const user = getUser();
    const token = getToken();
    const isRenderAble = () => {
      return token && token.length > 0 && user;
    }
  return (
    <Route
      {...rest}
      render={(props) => !isRenderAble() ? <Component setLoggedIn={setLoggedIn} {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}