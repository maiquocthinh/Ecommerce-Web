// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "@/app/action/CartActon";

const AddTocartSlice = createSlice({
    name: "Add-to-cart",
    initialState: {
        data: [] as any,
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; 
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
    },
});

export default AddTocartSlice.reducer;
