import { ProductType } from '../../../common/product';
// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getTabletProduct } from "../../action/action";

const TabletProductsSlice = createSlice({
    name: "tablet-products",
    initialState: {
        data: [] as ProductType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTabletProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getTabletProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getTabletProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
          
        
    },
});

export default TabletProductsSlice.reducer;
