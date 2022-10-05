import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-autheticated", // checking , not-autheticated , authenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
  },
  reducers: {
    login: (state, action) => {},
    logout: (state, payload) => {},
    checkingCredentials: (state) => {
      state.status = 'checking'
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
