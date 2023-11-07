import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleGetAllNeeds = () => {
    return axios.get(`/api/needs/all`, { headers });
};
const handleGetAllBrands = () => {
    return axios.get(`/api/brands/all`, { headers });
};
const handleGetAllCategories = () => {
    return axios.get(`/api/categories/all`, { headers });
};
export { handleGetAllNeeds, handleGetAllBrands, handleGetAllCategories };
