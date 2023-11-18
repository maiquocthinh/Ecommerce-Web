import axios from "axios";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllSuppliers = () => {
    return axios.get(`/api/supplier`, { headers });
};
const handleCreateSupplier = (formData: {
    name: string;
    description: string;
}) => {
    return axios.post(`/api/supplier`, formData, { headers });
};
const handleGetSupplier = (id: number) => {
    return axios.get(`/api/Suppliers/${id}`, { headers });
};
const handleUpdateSupplier = (
    formData: {
        name: string;
        description: string;
    },
    id: number
) => {
    return axios.patch(`/api/Suppliers/${id}`, formData, { headers });
};
const handleDeleteSupplier = (id: number) => {
    return axios.delete(`/api/Suppliers/${id}`, { headers });
};

export {
    handleCreateSupplier,
    handleGetSupplier,
    handleUpdateSupplier,
    handleDeleteSupplier,
    handleGetAllSuppliers,
};
