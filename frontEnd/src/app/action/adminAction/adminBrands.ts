import { defautlParametersGet } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminBrandApi from "../../../Server/adminBrand";
export const getBrandsByParams = createAsyncThunk(
    "getBrandsByParams/getBrandsByParams",
    async (formData: defautlParametersGet) => {
        try {
            const response = await adminBrandApi.handleGetBrandsByParam(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
