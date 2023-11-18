import { supplierType } from "@/common/suppelier";
import Cookies from "js-cookie";
import axios from "../utils/instance";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllSuppliers = () => {
    return axios.get(`/api/supplier`, { headers });
};
const handleGetSupplier = (id: number) => {
    return axios.get(`/api/supplier/${id}`, { headers });
};
const handleCreateSupplier = (formData: supplierType) => {
    return axios.post(`/api/supplier`, formData, { headers });
};
const handleDeleteSupplier = (id: number) => {
    return axios.delete(`/api/supplier/${id}`, { headers });
};
const handleUpdateSupplier = (formData: supplierType, id: number) => {
    return axios.patch(`/api/supplier/${id}`, formData, { headers });
};
export {};
