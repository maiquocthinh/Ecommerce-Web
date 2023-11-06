import { createAsyncThunk } from "@reduxjs/toolkit";
import * as orderApi from "@/Server/orderApi";
import { orderType } from "@/common/Order";
export const getAllOrder = createAsyncThunk(
    "getAllOrder/getAllOrder",
    async () => {
        try {
            const response = await orderApi.handleGetAllOrder();
            let data = response.data as orderType[];
            return data;
        } catch (error) {
            throw error;
        }
    }
);
