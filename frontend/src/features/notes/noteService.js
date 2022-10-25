import axios from "axios";
const API_URL = "http://localhost:5000/api/tickets/";

const getNotes = async (ticketId, token) => {
  //takes in ticketData and token from our ticketSlice
  const config = {
    //when we send a token with a request, it has to be sent in the request headers, specifically, in the authorization field. We dd this in Postman when testing routes
    headers: {
      Authorization: `Bearer ${token}`, //bearer token contains user ID, remember
    },
  };
  //make actual request via axios, passing api url, ticketdata and header data in for of config object
  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

const createNote = async (noteText, ticketId, token) => {
  //takes in ticketData and token from our ticketSlice
  const config = {
    //when we send a token with a request, it has to be sent in the request headers, specifically, in the authorization field. We dd this in Postman when testing routes
    headers: {
      Authorization: `Bearer ${token}`, //bearer token contains user ID, remember
    },
  };
  //make actual request via axios, passing api url, ticketdata and header data in for of config object
  const response = await axios.post(
    API_URL + ticketId + "/notes",
    { text: noteText },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
