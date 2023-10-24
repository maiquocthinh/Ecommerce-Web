import { ProductType } from '../../../common/product';
// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getLaptopProduct } from "../../action/action";

const LaptopProductsSlice = createSlice({
    name: "laptop-products",
    initialState: {
        data: [] as ProductType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getLaptopProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getLaptopProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getLaptopProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
          
        
    },
});

export default LaptopProductsSlice.reducer;
