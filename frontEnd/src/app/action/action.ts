import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productApi from "../../Server/ProductApi"
import { ProductType } from "../../common/product";
import { PosterType } from "../../common/Poster";
import { DevicesType } from "../../common/Device";
export const getAllProduct = createAsyncThunk(
    "getAllProduct/getAllProduct",
    async (data:{limit:number,type:string}) => {
        try {
            const response = await productApi.handleGetAllProduct(data.limit ,data.type); 
            let products: ProductType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);
export const getProductById = createAsyncThunk(
    "getProductById/getProductById",
    async (id:string|number) => {
        try {
            const response = await productApi.handleGetProductById(id); 
            let products: ProductType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);
export const getLaptopProduct = createAsyncThunk(
    "getLaptopProduct/getLaptopProduct",
    async (data:{limit:number,type:string}) => {
        try {
            const response = await productApi.handleGetAllProduct(data.limit ,data.type); 
            let products: ProductType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);
export const  getTabletProduct = createAsyncThunk(
    "getTabletProduct/getTabletProduct",
    async (data:{limit:number,type:string}) => {
        try {
            const response = await productApi.handleGetAllProduct(data.limit ,data.type); 
            let products: ProductType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);
export const getSaleProduct = createAsyncThunk(
    "getSaleProduct/getSaleProduct",
    async () => {
        try {
            const response = await productApi.handleGetSaleProduct(); // Gửi yêu cầu API// Trả về dữ liệu nhận được từ API
            let products: ProductType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);
export const getPosterSale = createAsyncThunk(
    "getPosterSale/getPosterSale",
    async () => {
        try {
            const response = await productApi.handleGetPosterSale(); // Gửi yêu cầu API// Trả về dữ liệu nhận được từ API
            let products: PosterType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);
export const getDevices = createAsyncThunk(
    "getDevices/getDevices",
    async () => {
        try {
            const response = await productApi.handleGetDevices(); // Gửi yêu cầu API// Trả về dữ liệu nhận được từ API
            let products: DevicesType[] = response.data;// Gửi yêu cầu API
            return products ; 
        } catch (error) {
            throw error;
        }
    }
);