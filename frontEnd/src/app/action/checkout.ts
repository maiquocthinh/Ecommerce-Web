import { createAsyncThunk } from "@reduxjs/toolkit";
import * as checkoutApi from "@/Server/checkoutApi";
import { checkoutProductType, productItemType } from "@/common/Cart";
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
export const CheckoutProduct = createAsyncThunk(
    "CheckoutProduct/CheckoutProduct",
    async (formData: checkoutProductType) => {
        try {
            const response = await checkoutApi.handleCheckOutWidthProduct(
                formData
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
    async (productItems: productItemType[]) => {
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
