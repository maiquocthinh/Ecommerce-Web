import { defautlParametersGet } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminCategoriesApi from "../../../Server/adminCategories";
export const getCategoriesByParams = createAsyncThunk(
    "getCategoriesByParams/getCategoriesByParams",
    async (formData: defautlParametersGet) => {
        try {
            const response =
                await adminCategoriesApi.handleGetCategoriesByParam(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
