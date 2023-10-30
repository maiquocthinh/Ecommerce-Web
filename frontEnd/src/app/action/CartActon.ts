import { createAsyncThunk } from "@reduxjs/toolkit";
import * as CartApi from "@/Server/CartApi"
export const addToCart = createAsyncThunk(
    "addToCart/addToCart",
    async (formdata:any) => {
        try {
            const response = await CartApi.handleAddToCart(formdata); 
            let data = response.data;
            return data ; 
        } catch (error) {
            throw error;
        }
    }
);
export const getAllCart = createAsyncThunk(
    "getAllCart/getAllCart",
    async (userID:number) => {
        try {
            const response = await CartApi.handleAllCart(userID); 
            let data = response.data;
            return data ; 
        } catch (error) {
            throw error;
        }
    }
);

