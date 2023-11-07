import Cookies from "js-cookie";
import axios from "../utils/instance";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleCheckOutWidthCart = (cartItemsIds: number[]) => {
    return axios.post(`/api/checkout/cart`, { cartItemsIds }, { headers });
};
const handleCheckOutWidthProduct = (cartItemsIds: number[]) => {
    return axios.post(`/api/checkout/product`, cartItemsIds, { headers });
};
const handleCheckOutWidthproductWithAuthentication = (
    cartItemsIds: number[]
) => {
    return axios.post(`/api/checkout/cart`, cartItemsIds, { headers });
};
export {
    handleCheckOutWidthCart,
    handleCheckOutWidthProduct,
    handleCheckOutWidthproductWithAuthentication,
};
