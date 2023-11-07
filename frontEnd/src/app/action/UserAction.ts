import { UserType } from "@/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import * as userApi from "../../Server/UserApi";
export const login = createAsyncThunk(
    "login/login",
    async (formData: UserType.userLoginType) => {
        try {
            const response = await userApi.handleLogin(formData);
            let data = response.data;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const registerAction = createAsyncThunk(
    "register/register",
    async (formdata: UserType.UserRegisterType) => {
        try {
            const response = await userApi.handleRegister(formdata);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const resetPassword = createAsyncThunk(
    "resetPassword/resetPassword",
    async (email: string) => {
        try {
            const response = await userApi.handleResetPassword(email);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const logout = createAction("user/logout");
export const getProfile = createAsyncThunk(
    "getProfile/getProfile",
    async () => {
        try {
            const response = await userApi.handleGetProfile();
            let data = response.data;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
