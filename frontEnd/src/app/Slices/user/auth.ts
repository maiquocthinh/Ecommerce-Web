import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register} from '@/app/action/UserAction';
import { UserType } from '@/common';



const initialState: UserType.AuthState = {
  isLoggedIn: false,
  data: {id:"",token:""},
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(logout, (state) => { // Thêm action cho logout
        state.isLoggedIn = false;
        state.data = { token: '' ,id:""};
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
