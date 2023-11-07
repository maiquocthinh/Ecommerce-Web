import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewApi from "../../Server/reviewApi";
import { commentType } from "@/common/review";
export const getAllReview = createAsyncThunk(
    "getAllReview/getAllReview",
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
export const createReview = createAsyncThunk(
    "createReview/createReview",
    async (formData: commentType) => {
        try {
            const response = await reviewApi.handleCreateReview(formData);
            let products = response.data;
            return products;
        } catch (error) {
            throw error;
        }
    }
);
