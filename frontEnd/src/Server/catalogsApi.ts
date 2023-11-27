import { defautlParametersGet } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
//needs
const handleGetAllNeeds = () => {
    return axios.get(`/api/needs/all`, { headers });
};
//brands
const handleGetAllBrands = () => {
    return axios.get(`/api/brands/all`, { headers });
};
//categories
const handleGetAllCategories = () => {
    return axios.get(`/api/categories/all`, { headers });
};

export { handleGetAllNeeds, handleGetAllBrands, handleGetAllCategories };
