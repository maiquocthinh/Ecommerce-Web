import { createAsyncThunk } from "@reduxjs/toolkit";
import * as checkoutApi from "@/Server/checkoutApi";
export const CheckOutWidthCart = createAsyncThunk(
    "CheckOutWidthCart/CheckOutWidthCart",
    async (cartItemsIds: number[]) => {
        try {
            const response = await checkoutApi.handleCheckOutWidthCart(
                cartItemsIds
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const checkoutWidthproductWithAuthentication = createAsyncThunk(
    "checkoutWidthproductWithAuthentication/checkoutWidthproductWithAuthentication",
    async (
        productItems: {
            productVersionId: number;
            quantity: number;
        }[]
    ) => {
        try {
            const response =
                await checkoutApi.handleCheckoutWidthproductWithAuthentication(
                    productItems
                );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
