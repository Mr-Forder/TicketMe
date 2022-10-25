import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

//initial state

const initialState = {
  tickets: [], //tickets - array to be filled with tickets
  ticket: {}, //single ticket object
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create a ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    //pass in ticketData comes from form
    try {
      const token = thunkAPI.getState().auth.user.token; //ThunkAPI method getState - can retrieve our global auth state, specifically our user token
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message =
        (error.response && //check a bunch of places - if there's something in any of these, use it to display error message
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); //thunkApi method to return error message //pull message from backend
    }
  }
);

//Get tickets for user
export const getTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; //ThunkAPI method getState - can retrieve our global auth state, specifically our user token
      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        (error.response && //check a bunch of places - if there's something in any of these, use it to display error message
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); //thunkApi method to return error message //pull message from backend
    }
  }
);

//Get single ticket
export const getTicket = createAsyncThunk(
  "tickets/get",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; //ThunkAPI method getState - can retrieve our global auth state, specifically our user token
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response && //check a bunch of places - if there's something in any of these, use it to display error message
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); //thunkApi method to return error message //pull message from backend
    }
  }
);

//Close ticket
export const closeTicket = createAsyncThunk(
  "tickets/close",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; //ThunkAPI method getState - can retrieve our global auth state, specifically our user token
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response && //check a bunch of places - if there's something in any of these, use it to display error message
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); //thunkApi method to return error message //pull message from backend
    }
  }
);

//Our actual slice
export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        getTickets;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = "closed")
            : ticket
        ); //map over tickets array -if ticket id matches id in action payload, set it's status to 'closed'
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
