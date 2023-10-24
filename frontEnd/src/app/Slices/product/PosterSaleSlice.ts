import { PosterType } from '../../../common/Poster';
// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getPosterSale } from "../../action/action";
const PosterSaleSlice = createSlice({
    name: "getPosterSale",
    initialState: {
        data: [] as PosterType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getPosterSale.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getPosterSale.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getPosterSale.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
          
        
    },
});

export default PosterSaleSlice.reducer;
