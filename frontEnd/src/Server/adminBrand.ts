import axios from "axios";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllBrands = () => {
    return axios.get(`/api/brands`, { headers });
};
const handleCreateBrand = (formData: { name: string; description: string }) => {
    return axios.post(`/api/brands`, formData, { headers });
};
const handleGetBrand = (id: number) => {
    return axios.get(`/api/brands/${id}`, { headers });
};
const handleUpdateBrand = (
    formData: {
        name: string;
        description: string;
    },
    id: number
) => {
    return axios.patch(`/api/brands/${id}`, formData, { headers });
};
const handleDeleteBrand = (id: number) => {
    return axios.delete(`/api/brands/${id}`, { headers });
};

export {
    handleCreateBrand,
    handleGetBrand,
    handleUpdateBrand,
    handleDeleteBrand,
    handleGetAllBrands,
};
