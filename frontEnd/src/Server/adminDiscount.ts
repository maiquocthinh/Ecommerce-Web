import { discounttype } from "@/common/discount";
import axios from "axios";
import Cookies from "js-cookie";

const handleGetAllDiscounts = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/disscounts`, { headers });
};
const handleGetDiscount = (discountId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/disscounts/${discountId}`, { headers });
};
const handleCreateDiscount = (formData: discounttype) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.post(`/api/disscounts`, formData, { headers });
};
const handleUpdateDiscount = (formData: discounttype, discountId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.patch(`/api/disscounts/${discountId}`, formData, { headers });
};
const handleDeleteDiscount = (discountId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.delete(`/api/disscounts/${discountId}`, { headers });
};
export {
    handleGetAllDiscounts,
    handleGetDiscount,
    handleCreateDiscount,
    handleUpdateDiscount,
    handleDeleteDiscount,
};
