import axios from "axios";
const API_URL = "http://localhost:5000/api/tickets/";

//create new ticket

const createTicket = async (ticketData, token) => {
  //takes in ticketData and token from our ticketSlice
  const config = {
    //when we send a token with a request, it has to be sent in the request headers, specifically, in the authorization field. We dd this in Postman when testing routes
    headers: {
      Authorization: `Bearer ${token}`, //bearer token contains user ID, remember
    },
  };
  //make actual request via axios, passing api url, ticketdata and header data in for of config object
  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

//get user tickets
const getTickets = async (token) => {
  //takes in ticketData and token from our ticketSlice
  const config = {
    //when we send a token with a request, it has to be sent in the request headers, specifically, in the authorization field. We dd this in Postman when testing routes
    headers: {
      Authorization: `Bearer ${token}`, //bearer token contains user ID, remember
    },
  };
  //make actual request via axios, passing api url, ticketdata and header data in for of config object
  const response = await axios.get(API_URL, config);

  return response.data;
};

//get single ticket
const getTicket = async (ticketId, token) => {
  //takes in ticketData and token from our ticketSlice
  const config = {
    //when we send a token with a request, it has to be sent in the request headers, specifically, in the authorization field. We dd this in Postman when testing routes
    headers: {
      Authorization: `Bearer ${token}`, //bearer token contains user ID, remember
    },
  };
  //make actual request via axios, passing api url, ticketdata and header data in for of config object
  const response = await axios.get(API_URL + ticketId, config);

  return response.data;
};

//Close ticket
const closeTicket = async (ticketId, token) => {
  //takes in ticketData and token from our ticketSlice
  const config = {
    //when we send a token with a request, it has to be sent in the request headers, specifically, in the authorization field. We dd this in Postman when testing routes
    headers: {
      Authorization: `Bearer ${token}`, //bearer token contains user ID, remember
    },
  };
  //make actual request via axios, passing api url, ticketdata and header data in for of config object
  const response = await axios.put(
    API_URL + ticketId,
    { status: "closed" },
    config
  );

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
