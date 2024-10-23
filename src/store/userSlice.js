import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    doLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { doLogin, doLogout } = userSlice.actions;
export default userSlice.reducer;
