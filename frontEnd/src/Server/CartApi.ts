import Cookies from "js-cookie";
import axios from "../utils/instance";
const handleAddToCart = (formData: any) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };

    return axios.post(`/api/cart`, formData, { headers });
};
const handleAllCart = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/cart`, { headers });
};
const handleDeleteCart = (id: number | string) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.delete(`/api/cart/${id}`, { headers });
};
export { handleAddToCart, handleAllCart, handleDeleteCart };
