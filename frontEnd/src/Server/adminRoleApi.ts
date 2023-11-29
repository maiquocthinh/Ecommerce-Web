import { defautlParametersGet } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("AdminToken")}`,
};
const handleGetListRole = (formData: defautlParametersGet) => {
    const { name, pageIndex, pageSize } = formData;
    const params =
        name?.trim() !== ""
            ? { RoleName: name, pageIndex, pageSize }
            : { pageIndex, pageSize };
    return axios.get(`/api/roles`, { params, headers });
};
const handleCreateRole = (formData: {
    name: string;
    permissions: string[];
}) => {
    return axios.post(`/api/roles`, formData, { headers });
};
const handleUpadteRole = (formData: {
    roleId: number;
    name: string;
    permissions: string[];
}) => {
    return axios.patch(`/api/roles/${formData.roleId}`, formData, { headers });
};
const handleDeleteRole = (roleId: number) => {
    return axios.delete(`/api/roles/${roleId}`, { headers });
};
const handleGetRole = (id: number) => {
    return axios.get(`/api/roles/${id}`, { headers });
};
const handleGetAllPermissions = () => {
    return axios.get(`/api/roles/all-permissions`, { headers });
};
export {
    handleGetListRole,
    handleCreateRole,
    handleGetRole,
    handleGetAllPermissions,
    handleUpadteRole,
    handleDeleteRole,
};
