import { defautlParametersGet } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("AdminToken")}`,
};
const handleCreateNeed = (formData: { title: string; description: string }) => {
    return axios.post(`/api/needs`, formData, { headers });
};
const handleGetNeed = (id: number) => {
    return axios.get(`/api/needs/${id}`, { headers });
};
const handleUpdateNeed = (formData: {
    title: string;
    description: string;
    id: number;
}) => {
    return axios.patch(`/api/needs/${formData.id}`, formData, { headers });
};
const handleDeleteNeed = (id: number) => {
    return axios.delete(`/api/needs/${id}`, { headers });
};
const handleGetNeedsByParam = (formData: defautlParametersGet) => {
    const { name, pageIndex, pageSize } = formData;
    const params =
        name?.trim() !== ""
            ? { NeedName: name, pageIndex, pageSize }
            : { pageIndex, pageSize };
    return axios.get(`/api/needs`, { params, headers });
};
export {
    handleCreateNeed,
    handleGetNeed,
    handleUpdateNeed,
    handleDeleteNeed,
    handleGetNeedsByParam,
};
