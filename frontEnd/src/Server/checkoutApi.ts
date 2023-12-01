import Cookies from "js-cookie";
import axios from "../utils/instance";

const handleCheckOutWidthCart = (cartItemsIds: number[]) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/checkout/cart`, { cartItemsIds }, { headers });
};
const handleCheckOutWidthProduct = (cartItemsIds: number[]) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/checkout/product`, cartItemsIds, { headers });
};
const handleCheckoutWidthproductWithAuthentication = (
    items: {
        productVersionId: number;
        quantity: number;
    }[]
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
