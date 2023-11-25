import { defautlParametersGet } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminRolesApi from "../../../Server/adminRoleApi";
export const getListRoles = createAsyncThunk(
    "getListRoles/getListRoles",
    async (formData: defautlParametersGet) => {
        try {
            const response = await adminRolesApi.handleGetListRole(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
