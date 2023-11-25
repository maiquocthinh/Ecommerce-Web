import { defautlParametersGet } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleCreateCategory = (formData: {
    name: string;
    description: string;
}) => {
    return axios.post(`/api/categories`, formData, { headers });
};
const handleGetCategory = (id: number) => {
    return axios.get(`/api/categories/${id}`, { headers });
};
const handleUpdateCategory = (
    formData: {
        name: string;
        description: string;
    },
    id: number
) => {
    return axios.patch(`/api/categories/${id}`, formData, { headers });
};
const handleDeleteCategory = (id: number) => {
    return axios.delete(`/api/categories/${id}`, { headers });
};
const handleGetCategoriesByParam = (formData: defautlParametersGet) => {
    const { name, pageIndex, pageSize } = formData;
    const params =
        name?.trim() !== ""
            ? { CategoryName: name, pageIndex, pageSize }
            : { pageIndex, pageSize };
    return axios.get(`/api/categories`, { params, headers });
};
export {
    handleCreateCategory,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleGetCategoriesByParam,
};
