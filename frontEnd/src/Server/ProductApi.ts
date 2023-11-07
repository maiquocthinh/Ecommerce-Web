import { paramsProductType } from "@/common/product";
import axios from "../utils/instance";
const handleGetAllProduct = (param: paramsProductType) => {
    let { Filters, Keyword, SortedBy, pageIndex, pageSize } = param;
    if (!pageIndex) pageIndex = "1";
    if (!pageSize) pageSize = "10";
    return axios.get(
        `/api/products?pageSize=${pageSize}?pageIndex=${pageIndex}${
            Filters?.CategoryId
                ? `&Filters.CategoryId=${Filters?.CategoryId}`
                : "&"
        }`
    );
};
const handleGetLaptopProduct = (param: paramsProductType) => {
    let { pageIndex, pageSize } = param;
    if (!pageIndex) pageIndex = "1";
    if (!pageSize) pageSize = "10";
    return axios.get(
        `/api/products?pageSize=${pageSize}?pageIndex=${pageIndex}&Filters.CategoryId=3&SortedBy=new`
    );
};
const handleGetMobileProduct = (param: paramsProductType) => {
    let { pageIndex, pageSize } = param;
    if (!pageIndex) pageIndex = "1";
    if (!pageSize) pageSize = "10";
    return axios.get(
        `/api/products?pageSize=${pageSize}?pageIndex=${pageIndex}&Filters.CategoryId=2&SortedBy=new`
    );
};
const handleSearchProduct = (Keyword: string) => {
    const pageIndex = "1";
    const pageSize = "10";
    return axios.get(
        `/api/products?pageSize=${pageSize}?pageIndex=${pageIndex}&Keyword=${Keyword}`
    );
};
const handleGetProductById = (id: string | number) => {
    return axios.get(`/api/products/${id}`);
};
export {
    handleGetAllProduct,
    handleGetProductById,
    handleGetLaptopProduct,
    handleGetMobileProduct,
    handleSearchProduct,
};
