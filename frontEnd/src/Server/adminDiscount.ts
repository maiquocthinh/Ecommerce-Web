import { discounttype } from "@/common/discount";
import axios from "axios";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllDiscounts = () => {
    return axios.get(`/api/disscounts`, { headers });
};
const handleGetDiscount = (discountId: number) => {
    return axios.get(`/api/disscounts/${discountId}`, { headers });
};
const handleCreateDiscount = (formData: discounttype) => {
    return axios.post(`/api/disscounts`, formData, { headers });
};
const handleUpdateDiscount = (formData: discounttype, discountId: number) => {
    return axios.patch(`/api/disscounts/${discountId}`, formData, { headers });
};
const handleDeleteDiscount = (discountId: number) => {
    return axios.delete(`/api/disscounts/${discountId}`, { headers });
};
export {
    handleGetAllDiscounts,
    handleGetDiscount,
    handleCreateDiscount,
    handleUpdateDiscount,
    handleDeleteDiscount,
};
