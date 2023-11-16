import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllOrder = () => {
    return axios.get(`/api/orders`, { headers });
};
const handleCancelOrder = (orderId: number) => {
    return axios.post(`/api/orders/cancel/${orderId}`, null, {
        headers: headers,
    });
};
export { handleGetAllOrder, handleCancelOrder };
