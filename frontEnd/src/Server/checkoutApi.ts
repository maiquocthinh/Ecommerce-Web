import Cookies from "js-cookie";
import axios from "../utils/instance";
import { checkoutProductType, productItemType } from "@/common/Cart";

const handleCheckOutWidthCart = (cartItemsIds: number[]) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/checkout/cart`, { cartItemsIds }, { headers });
};
const handleCheckOutWidthProduct = (formData: checkoutProductType) => {
    return axios.post(`/api/checkout/product`, formData);
};
const handleCheckoutWidthproductWithAuthentication = (
    items: productItemType[]
) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(
        `/api/checkout/product-with-authentication`,
        { items },
        {
            headers,
        }
    );
};
export {
    handleCheckOutWidthCart,
    handleCheckOutWidthProduct,
    handleCheckoutWidthproductWithAuthentication,
};
