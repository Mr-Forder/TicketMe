import axios from "axios";
const API_URL = "http://localhost:5000/api/users";

//auth service is us basically making the same requests we did in Postman via the frontend. we then call these async functions via axios

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData); //use axios to make post request to our api url, passing in userData
  if (response.data) {
    //if the server responds with anything - (it'll be our json web token, we created that functionality in backend)
    localStorage.setItem("user", JSON.stringify(response.data)); //set response data (jwt)  using 'user' as a key to Local storage -stringified cos LS can only use strings
  }
  return response.data; //return response data (jwt)
};

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData); //use axios to make post request to our api url, passing in userData
  if (response.data) {
    //if the server responds with anything - (it'll be our json web token, we created that functionality in backend)
    localStorage.setItem("user", JSON.stringify(response.data)); //set response data (jwt)  using 'user' as a key to Local storage -stringified cos LS can only use strings
  }
  return response.data; //return response data (jwt)
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
