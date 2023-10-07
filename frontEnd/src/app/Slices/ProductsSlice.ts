// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../action/action";

const ProductsSlice = createSlice({
    name: "allComic",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state:any) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state:any, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllProduct.rejected, (state:any, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default ProductsSlice.reducer;
