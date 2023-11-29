import { defautlParametersGet, supplierType } from "@/common/getAllType";
import axios from "axios";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllSuppliers = (formData: defautlParametersGet) => {
    const { name, pageIndex, pageSize } = formData;
    const params =
        name?.trim() !== ""
            ? { Keyword: name, pageIndex, pageSize }
            : { pageIndex, pageSize };
    return axios.get(`/api/supplier`, { params, headers });
};
const handleCreateSupplier = (formData: supplierType) => {
    return axios.post(`/api/supplier`, formData, { headers });
};
const handleGetSupplier = (id: number) => {
    return axios.get(`/api/supplier/{id}`, { headers });
};
const handleUpdateSupplier = (formData: supplierType) => {
    return axios.patch(`/api/supplier/${formData.id}`, formData, { headers });
};
const handleDeleteSupplier = (id: number) => {
    return axios.delete(`/api/supplier/{id}`, { headers });
};

export {
    handleCreateSupplier,
    handleDeleteSupplier,
    handleGetAllSuppliers,
    handleGetSupplier,
    handleUpdateSupplier,
};
