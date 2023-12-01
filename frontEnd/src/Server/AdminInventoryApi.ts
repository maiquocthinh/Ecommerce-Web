import { supplierType } from "@/common/suppelier";
import Cookies from "js-cookie";
import axios from "../utils/instance";

const handleGetAllSuppliers = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/supplier`, { headers });
};
const handleGetSupplier = (id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/supplier/${id}`, { headers });
};
const handleCreateSupplier = (formData: supplierType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.post(`/api/supplier`, formData, { headers });
};
const handleDeleteSupplier = (id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.delete(`/api/supplier/${id}`, { headers });
};
const handleUpdateSupplier = (formData: supplierType, id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.patch(`/api/supplier/${id}`, formData, { headers });
};
export {};
