import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewApi from "../../Server/reviewApi";
import { paramsProductType } from "../../common/product";
export const getAllProduct = createAsyncThunk(
    "getAllProduct/getAllProduct",
    async (id: number) => {
        try {
            const response = await reviewApi.handlegetAllReview(id);
            let products = response.data;
            return products;
        } catch (error) {
            throw error;
        }
    }
);
