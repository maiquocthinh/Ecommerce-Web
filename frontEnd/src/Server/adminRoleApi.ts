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
export { handleGetListRole };
