import { ProductType } from '../../../common/product';
// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../../action/action";

const PosterSaleSlice = createSlice({
    name: "products",
    initialState: {
        data: [] as ProductType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getAllProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
    },
});

export default PosterSaleSlice.reducer;
