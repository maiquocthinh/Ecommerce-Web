// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getSaleProduct } from "../action/action";
import {ProductType} from "../../common/product"
const SaleProductSlice = createSlice({
    name: "getSaleProduct",
    initialState: {
        data: [] as ProductType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSaleProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSaleProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getSaleProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
          
        
    },
});

export default SaleProductSlice.reducer;
