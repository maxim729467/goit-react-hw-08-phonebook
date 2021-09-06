import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./auth-operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    unsetError: (state) => ({ ...state, error: null }),
  },
  extraReducers: {
    [authOperations.signUp.pending](state, action) {
      state.isLoading = true;
      state.error = false;
    },
    [authOperations.signUp.rejected](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = true;
    },
    [authOperations.signUp.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },

    [authOperations.logIn.pending](state, action) {
      state.isLoading = true;
      state.error = false;
    },
    [authOperations.logIn.rejected](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = true;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },

    [authOperations.logOut.pending](state) {
      state.isLoading = true;
      state.error = false;
    },
    [authOperations.logOut.rejected](state) {
      state = {
        ...state,
        isLoading: false,
        error: true,
      };
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
});

export const unsetError = authSlice.actions.unsetError;
export default authSlice.reducer;
