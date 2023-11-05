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
const handleGetProductById = (id: string | number) => {
    return axios.get(`/api/products/${id}`);
};
export { handleGetAllProduct, handleGetProductById };
