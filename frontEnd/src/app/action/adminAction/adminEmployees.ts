import { UserType } from "@/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminEmployeesApi from "../../../Server/adminEmployeesApi";
export const AdminLogin = createAsyncThunk(
    "AdminLogin/AdminLogin",
    async (formData: UserType.userLoginType) => {
        try {
            const response = await adminEmployeesApi.handleLoginAdmin(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
