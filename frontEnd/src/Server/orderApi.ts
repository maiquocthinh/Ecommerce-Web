import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllOrder = () => {
    return axios.get(`/api/orders`, { headers });
};
export { handleGetAllOrder };
