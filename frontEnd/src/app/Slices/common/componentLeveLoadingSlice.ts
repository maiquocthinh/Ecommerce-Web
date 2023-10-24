import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: null, // Sử dụng null thay vì false
};

const componentLevelLoadingSlice = createSlice({
  name: 'componentLevelLoading',
  initialState,
  reducers: {
    setComponentLevelLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setComponentLevelLoading } = componentLevelLoadingSlice.actions;
export default componentLevelLoadingSlice.reducer;
