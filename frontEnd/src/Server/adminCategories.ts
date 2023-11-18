import axios from "axios";
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
const handleGetAllCategories = () => {
    return axios.get(`/api/categories`, { headers });
};
export {
    handleCreateCategory,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleGetAllCategories,
};
