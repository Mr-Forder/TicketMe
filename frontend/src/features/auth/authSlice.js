import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//get user from localStorage
// const user = JSON.parse(localStorage.getItem("user"));
const user = //if no window, return nothing, if window is not undefined, return user from localStorage
  //When you're rendering on the server, you do not have a browser and thus you do not have access to all the APIs that the browser provides, including localStorage.

  //In JavaScript code that is running both on the server and on the client (browser), it is common practice to guard against with an if clause that checks if window is defined.
  //“Window” is the root object provided by the browser for all the APIs that are provided by the browser.
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

//initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    //user comes from form
    try {
      return await authService.register(user); //return result of authservice register function, taking in user
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
//LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user); //return result of authservice register function, taking in user
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); //thunkApi method to return error message //pull message from backend
    }
  }
);

//LOGOUT USER

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout(); //run logout function in authservice
});

//OUR ACTUAL SLICE
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions; //export reset action to be imported into whatever component needs access to it (header component atm)
export default authSlice.reducer; //export authslice to be imported into store
