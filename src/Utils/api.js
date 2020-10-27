import axios from 'axios';
import {
  getUserApi, 
  getRestaurantApi, 
  getMealApi, 
  getOrderApi, 
  getRestaurantApiOwner, 
  getMealApiOwner, 
  getOrderApiOwner,
  getBlockUserApiOwner
  } from './endpoints'
import { getUser, setUserSession, getToken,removeUserSession } from './Common';

const getRedirectUrl = () => {
  const user = getUser();
  if (user) {
    return "/";
  } 
  return "/login"
}

const config = { 
  crossdomain: true ,
  headers: {
    'Access-Control-Allow-Origin': '*'
    }
};

axios.interceptors.request.use(function (config) {
  config.headers.Authorization =  "Bearer " + getToken();
  config.headers.common['current-user'] =  getUser()? getUser().id : "";
  return config;
});

export const signInHandle = (username, password, setLoading, setError, setRedirect, setLoggedIn) => {
  setError(null);
  setLoading(true); 
  const endpoint = getUserApi();  
  const data = { username: username, password: password };
  axios.post( endpoint + '/login', data , config).then(response => {
    setLoading(false);
    setUserSession( response.data.token, response.data.user );
    if ( setLoggedIn ) {
      setLoggedIn(true);
    }
    setRedirect(getRedirectUrl());
  }).catch(error => {
    setLoading(false);
    if (error && error.response && error.response.status === 401) setError(error.response.data.message);
    else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
    else setError("Something went wrong. Please try again later.");
  });
}

export const signUpHandle = (user, setLoading, setError, setCurrent) => {
  const endpoint = getUserApi();  
  const data = {
     firstname: user.firstname, 
     lastname: user.lastname, 
     username: user.username, 
     password: user.password, 
     confirm_password: user.confirm_password,
     user_type: user.user_type
  }
  axios.post( endpoint + '/signup', data, config).then(response => {  
    setLoading(false);
    setCurrent();
  }).catch(error => {
    setLoading(false);
    if (error && error.response && error.response.status === 401) setError(error.response.data.message);
    else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
    else setError("Something went wrong. Please try again later.");
  });
}

export const signOut = (setLoading, setError, setChanged) => {
  const user = getUser();
  const id = user.id;
  const endpoint = getUserApi();  
  axios.get( endpoint + '/logout?id=' + id, config).then(response => {
    setLoading(false);
    removeUserSession();
  }).catch(error => {
    setLoading(false);
    if (error && error.response && error.response.status === 401) setError(error.response.data.message);
    else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
    else setError("Something went wrong. Please try again later.");
  });
}

export const fetchRestaurants = ( setLoading, setData, setError, count, per_page) => {
	const endpoint = getRestaurantApi();
	const user = getUser();
	const id = user.id;
	axios.get(endpoint + '?user_id=' + id + "&count=" + count + "&per_page="+ per_page , config).then(response => {
      setLoading(false);
      setData(response.data);
  }).catch( error => {
     setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
  });
}

export const fetchSingleRestaurants = ( restaurantId, setLoading, setData, setError ) => {

  const endpoint = getRestaurantApiOwner() + '/fetch_single_restaurant';
  const user = getUser();
  const id = user.id;
  axios.get(endpoint + '?user_id=' + id  + "&restaurant_id=" + restaurantId, config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};


export const fetchSingleRestaurantsRegular = ( restaurantId, setLoading, setData, setError ) => {

  const endpoint = getRestaurantApi() + '/fetch_single_restaurant';
  const user = getUser();
  const id = user.id;
  axios.get(endpoint + '?user_id=' + id  + "&restaurant_id=" + restaurantId, config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};


export const deleteSingleRestaurant = ( restaurantId, setLoading, setData, setError ) => {

  const endpoint = getRestaurantApiOwner() + '/delete_restaurant';
  const user = getUser();
  const id = user.id;
  const data = {
    user_id: id,
    restaurant_id: restaurantId
  }
  axios.post(endpoint, data ,config).then(response => {
      setLoading(false);
      setData();
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};


export const deleteSingleMeal = ( mealId, setLoading, setData, setError ) => {

  const endpoint = getMealApiOwner() + '/delete_meal';
  const user = getUser();
  const id = user.id;
  const data = {
    user_id: id,
    meal_id: mealId
  }
  axios.post(endpoint, data ,config).then(response => {
      setLoading(false);
      setData();
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};


export const fetchRestaurantsOwner = ( setLoading, setData, setError , count, per_page) => {
  const endpoint = getRestaurantApiOwner();
  const user = getUser();
  const id = user.id;

  axios.get(endpoint + '?user_id=' + id + "&count=" + count + "&per_page="+ per_page, config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};

export const fetchUsersRestaurants = ( restaurantId, setLoading, setData, setError, count, per_page ) => {

  const endpoint = getBlockUserApiOwner() + '/fetch_users_by_restaurant';
  const user = getUser();
  const id = user.id;
  const params = "user_id=" + id  + "&restaurant_id=" + restaurantId + "&count=" + count + "&per_page="+ per_page;
  axios.get(endpoint + '?' + params, config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};


export const blockUserRestaurant = ( restaurantId, userId, block, setLoading, setData, setError ) => {
  const endpoint = getBlockUserApiOwner() + '/create_or_update';
  const data = {
    user_id: userId,
    restaurant_id: restaurantId,
    blocked: block
  }
  axios.post(endpoint, data, config).then(response => {
      setLoading(false);
      setData();
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};


export const fetchSingleMeal = ( mealId, restaurantId, setLoading, setData, setError ) => {

  const endpoint = getMealApiOwner() + '/fetch_single_meal';
  const user = getUser();
  const id = user.id;
  axios.get(endpoint + '?user_id=' + id  + "&restaurant_id=" + restaurantId + "&meal_id=" + mealId, config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
};




export const updateMealOwner = ( mealId, restaurantId, name, desc, price, setLoading, setError, setFinished) => {
  const endpoint = getMealApiOwner() + '/update';
  const user = getUser();
  const id = user.id;
  
  const data = {
    id: mealId,
    restaurant_id: restaurantId,
    user_id: id,
    name: name,
    description: desc,
    price: price
  }

  axios.post(endpoint, data, config).then(response => {
      setLoading(false);
      setFinished(true);
    }).catch(error => {
      setLoading(false);
      setFinished(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}

export const createRestaurantsOwner = ( name, desc, setLoading, setError, setFinished) => {
  const endpoint = getRestaurantApiOwner();
  const user = getUser();
  const id = user.id;
  
  const data = {
    user_id: id,
    name: name,
    description: desc
  }

  axios.post(endpoint, data, config).then(response => {
      setLoading(false);
      setFinished(true);
  }).catch(error => {
      setLoading(false);
      setFinished(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}

export const updateRestaurantsOwner = ( restaurantId, name, desc, setLoading, setError, setFinished) => {
  const endpoint = getRestaurantApiOwner() + '/update';
  const user = getUser();
  const id = user.id;
  
  const data = {
    id: restaurantId,
    user_id: id,
    name: name,
    description: desc
  }

  axios.post(endpoint, data, config).then(response => {
      setLoading(false);
      setFinished(true);
    }).catch(error => {
      setLoading(false);
      setFinished(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}


export const createMealOwner = ( restaurantId ,name, desc, price ,setLoading, setError, setFinished) => {
  const endpoint = getMealApiOwner();
  const user = getUser();
  const id = user.id;
  
  const data = {
    restaurant_id: restaurantId,
    name: name,
    description: desc,
    price: price,
    user_id: id
  }

  axios.post(endpoint, data, config).then(response => {
      setLoading(false);
      setFinished(true);
    }).catch(error => {
      setLoading(false);
      setFinished(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}


export const fetchMeals = ( restaurant_id, setLoading, setData, setError ) => {
  const endpoint = getMealApi();
  const user = getUser();
  const id = user.id;
  axios.get(endpoint + '?user_id=' + id + "&restaurant_id=" + restaurant_id , config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
  });
}

export const fetchMealsByRestaurant = (restaurantId, setLoading, setData, setError ) => {
  const endpoint = getMealApiOwner();
  const user = getUser();
  const id = user.id;
  axios.get(endpoint + '?user_id=' + id + "&restaurant_id=" + restaurantId , config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}

export const placeOrder = ( restaurant_id, meals, setLoading, setFinished, setError ) => {
  const endpoint = getOrderApi();
  const user = getUser();
  const id = user.id;
  const data = {
    user_id: id,
    restaurant_id: restaurant_id,
    comment: " mamamama",
    meals: meals
  }
  axios.post(endpoint, data, config).then(response => {
      setLoading(false);
      setFinished(true);
    }).catch(error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}


export const fetchUserOrders = (setLoading , setData, setError, count, per_page) => {
  const endpoint = getOrderApi() + "/show_user_order";
  const user = getUser();
  const id = user.id;
    axios.get(endpoint + '?user_id=' + id + "&count=" + count + "&per_page="+ per_page, config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}


export const fetchOwnerOrders = (setLoading , setData, setError, count, per_page) => {
  const endpoint = getOrderApiOwner() + "/show_owner_order";
  const user = getUser();
  const id = user.id;
  axios.get(endpoint + '?user_id=' + id + "&count=" + count + "&per_page="+ per_page, config).then(response => {
      setLoading(false);
      setData(response.data);
    }).catch( error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}


export const updateNextStatus = (isOwner,  order_id, next_status, setLoading, setData, setError) => {
  let endpoint = isOwner ? getOrderApiOwner() : getOrderApi();
  const user = getUser();
  const id = user.id;
  
  const data = {
    user_id: id,
    next_status: next_status,
    id: order_id
  }
  
  axios.post(endpoint + '/update_order', data, config).then(response => {
      setLoading(false);
      setData();
    }).catch(error => {
      setLoading(false);
      if (error && error.response && error.response.status === 401) setError(error.response.data.message);
      else if (error && error.response && error.response.status === 400) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
}