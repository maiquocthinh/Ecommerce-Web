import { addressType } from "@/common/Address";
import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleAddAddress = (formData: addressType) => {
    return axios.post(`/api/customer/addresses`, formData, { headers });
};
const handleUpdateAddress = (formData: addressType) => {
    return axios.patch(`/api/customer/addresses/${formData.id}`, formData, {
        headers,
    });
};
const handleUpdateDefaultAddress = (formData: {
    id: number;
    isDefault: boolean;
}) => {
    return axios.patch(`/api/customer/addresses/${formData.id}`, formData, {
        headers,
    });
};
const handleGetAllAddresses = () => {
    return axios.get(`/api/customer/addresses`, { headers });
};
const handleDeleteAddresses = (id: number) => {
    return axios.delete(`/api/customer/addresses/${id}`, { headers });
};
export {
    handleAddAddress,
    handleGetAllAddresses,
    handleDeleteAddresses,
    handleUpdateAddress,
    handleUpdateDefaultAddress,
};
