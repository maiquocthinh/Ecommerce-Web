import { defautlParametersGet } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetBrandsByParam = (formData: defautlParametersGet) => {
    const { name, pageIndex, pageSize } = formData;
    const params =
        name?.trim() !== ""
            ? { BrandName: name, pageIndex, pageSize }
            : { pageIndex, pageSize };
    return axios.get(`/api/brands`, { params, headers });
};
const handleCreateBrand = (formData: { name: string; description: string }) => {
    return axios.post(`/api/brands`, formData, { headers });
};
const handleGetBrand = (id: number) => {
    return axios.get(`/api/brands/${id}`, { headers });
};
const handleUpdateBrand = (formData: {
    id: number;
    name: string;
    description: string;
}) => {
    return axios.patch(`/api/brands/${formData.id}`, formData, { headers });
};
const handleDeleteBrand = (id: number) => {
    return axios.delete(`/api/brands/${id}`, { headers });
};

export {
    handleCreateBrand,
    handleGetBrand,
    handleUpdateBrand,
    handleDeleteBrand,
    handleGetBrandsByParam,
};
