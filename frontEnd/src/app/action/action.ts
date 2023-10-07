import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productApi from "../../Server/ProductApi"
export const getAllProduct = createAsyncThunk(
    "getAllProduct/getAllProduct",
    async () => {
        try {
            const response = await productApi.handleGetAllProduct(); // Gửi yêu cầu API
            return response; // Trả về dữ liệu nhận được từ API
        } catch (error) {
            throw error;
        }
    }
);