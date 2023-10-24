import { ProductType } from '../../../common/product';
// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getDevices } from "../../action/action";
import { DevicesType } from '../../../common/Device';

const DevicesSlice = createSlice({
    name: "Devices-slice",
    initialState: {
        data: [] as DevicesType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDevices.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getDevices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getDevices.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
          
        
    },
});

export default DevicesSlice.reducer;
