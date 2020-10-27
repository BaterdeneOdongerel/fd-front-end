export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

export const getToken = () => {
  return localStorage.getItem('token') || null;
}
 
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export const setUserSession = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export const addItemToCart = (restaurantId , meal , amount) => {
	const userJson = getUser();
  if (userJson){
    let currentRestaurantId = -1;
  	if ( userJson['cart'] && userJson['cart']['restaurantId']) {
      currentRestaurantId =  userJson['cart']['restaurantId'];
    }

    let orders = [];
    if ( userJson['cart'] && userJson['cart']['orders'] ) {
      orders = userJson['cart']['orders'];
    }

    if (restaurantId != currentRestaurantId) {
      currentRestaurantId = restaurantId;
      orders = [];
    }
    const len = orders.length; 
    orders.push( { id: len,  meal: meal , amount: amount } );
    
    userJson['cart'] = { restaurantId: restaurantId, orders: orders};
    localStorage.setItem('user', JSON.stringify(userJson));
  }
}

export const clearCart = () => {
  const userJson = getUser();
  if (userJson){ 
    userJson['cart'] = { restaurantId: -1, orders: []};
    localStorage.setItem('user', JSON.stringify(userJson));
  }
}

export const removeItemFromCart = ( id, meal ) => {
  const userJson = getUser();
  if (userJson) {
    let currentRestaurantId = -1;
    if ( userJson['cart'] && userJson['cart']['restaurantId']) {
      currentRestaurantId =  userJson['cart']['restaurantId'];
    }

    let orders = [];
    if ( userJson['cart'] && userJson['cart']['orders'] ) {
      orders = userJson['cart']['orders'];
    }
    for (let i = 0; i < orders.length; i ++ ) {
      if ( orders[i]['meal'] && id == orders[i]['id'] && meal.id ==  orders[i]['meal'].id) {
        orders.splice(i, 1);
        break;
      } 
    }
    userJson['cart'] = { restaurantId: currentRestaurantId, orders: orders};
    localStorage.setItem('user', JSON.stringify(userJson));
  }
}

export const getItemFromCart = () => {
	const userStr = localStorage.getItem('user');
  	if ( userStr ) {
  		const userJson = JSON.parse(userStr);
  		if (userJson['cart']) return userJson['cart'];
  		else return {restaurantId: -1, orders: []};
  	} else {
  		return {restaurantId: -1, orders: []};
  	}
}


export const changeQuantityItemFromCart = ( id, meal, newQuantity ) => {
  const userJson = getUser();
  if (userJson) {
    let currentRestaurantId = -1;
    if ( userJson['cart'] && userJson['cart']['restaurantId']) {
      currentRestaurantId =  userJson['cart']['restaurantId'];
    }

    let orders = [];
    if ( userJson['cart'] && userJson['cart']['orders'] ) {
      orders = userJson['cart']['orders'];
    }
    for (let i = 0; i < orders.length; i ++ ) {
      if ( orders[i]['meal'] && id == orders[i]['id'] && meal.id ==  orders[i]['meal'].id) {
        orders[i]['amount'] = newQuantity;
        break;
      } 
    }

    userJson['cart'] = { restaurantId: currentRestaurantId, orders: orders};
    localStorage.setItem('user', JSON.stringify(userJson));
  }
}

export const FormatDate = (date) => {
  const d = String((new Date(date))).split(" ");
  let answer = "";
  for (let i = 0; i < d.length && i < 5; i ++ ){
    answer = answer + " " + d[i];
  }
  return answer;
}