import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllOrder = () => {
    return axios.get(`/api/orders`, { headers });
};
const handleCancelOrder = (orderId: number) => {
    return axios.get(`/api/orders/cancel/${orderId}`, { headers });
};
export { handleGetAllOrder, handleCancelOrder };
