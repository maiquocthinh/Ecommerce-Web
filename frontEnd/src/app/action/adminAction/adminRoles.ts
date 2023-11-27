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
export const getAllPermissions = createAsyncThunk(
    "getAllPermissions/getAllPermissions",
    async () => {
        try {
            const response = await adminRolesApi.handleGetAllPermissions();
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateRole = createAsyncThunk(
    "adminCreateRole/adminCreateRole",
    async (formData: { name: string; permissions: string[] }) => {
        try {
            const response = await adminRolesApi.handleCreateRole(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
