const API = 'http://localhost:8000/api/v1';
const API_OWER = 'http://localhost:8000/api/v2';

export const getUserApi = () => {
  return API + "/users";
}
export const getRestaurantApi = () => {
  return API + "/restaurants";
}
export const getOrderApi = () => {
	return API + "/orders";
}
export const getMealApi = () => {
	return API + "/meals";
}
export const getRestaurantApiOwner = () => {
  return API_OWER + "/restaurants";
}
export const getOrderApiOwner = () => {
	return API_OWER + "/orders";
}
export const getMealApiOwner = () => {
	return API_OWER + "/meals";
}
export const getBlockUserApiOwner = () => {
	return API_OWER + "/blockusers";
}
