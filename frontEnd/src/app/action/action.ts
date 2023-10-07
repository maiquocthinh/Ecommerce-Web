import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productApi from "../../Server/ProductApi"
import { ProductType } from "../../common/product";
export const getAllProduct = createAsyncThunk(
    "getAllProduct/getAllProduct",
    async () => {
        try {
            const response = await productApi.handleGetAllProduct(); 
            let products: ProductType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);
export const getSaleProduct = createAsyncThunk(
    "getSaleProduct/getSaleProduct",
    async () => {
        try {
            const response = await productApi.handleGetSaleProduct(); // Gửi yêu cầu API// Trả về dữ liệu nhận được từ API
            let products: ProductType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);