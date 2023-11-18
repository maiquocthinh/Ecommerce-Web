import { getProductType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as addminProductApi from "../../../Server/addminProductApi";
export const adminAllProduct = createAsyncThunk(
    "adminAllProduct/adminAllProduct",
    async (formData: getProductType) => {
        try {
            const response = await addminProductApi.handleGetAllProducts(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
