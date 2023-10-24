import { ProductType } from '../../../common/product';
// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../../action/action";

const ProductByIdSlice = createSlice({
    name: "productByid",
    initialState: {
        data: [] as ProductType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProductById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getProductById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
          
        
    },
});

export default ProductByIdSlice.reducer;
