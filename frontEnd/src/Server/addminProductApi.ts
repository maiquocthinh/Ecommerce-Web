import {
    cretaeProductVersionType,
    productCreateOptionsType,
} from "@/common/product";
import Cookies from "js-cookie";
import axios from "../utils/instance";
import { getProductType } from "@/common/getAllType";
import { addProductType } from "@/common/adminType/AdminProduct";
const headers = {
    Authorization: `Bearer ${Cookies.get("AdminToken")}`,
};

const handleGetAllProducts = (formData: getProductType) => {
    const { Keyword, SortedBy, pageIndex, pageSize, Filters } = formData;
    const queryParams: any = {};

    if (Keyword) queryParams.Keyword = Keyword;
    if (SortedBy) queryParams.SortedBy = SortedBy;
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;
    if (Filters) {
        const {
            Viewable,
            OutOfStock,
            CategoryId,
            BrandId,
            NeedId,
            PriceRange,
        } = Filters;

        if (Viewable !== undefined) queryParams["Filters.Viewable"] = Viewable;
        if (OutOfStock !== undefined)
            queryParams["Filters.OutOfStock"] = OutOfStock;
        if (CategoryId !== undefined)
            queryParams["Filters.CategoryId"] = CategoryId;
        if (BrandId !== undefined) queryParams["Filters.BrandId"] = BrandId;
        if (NeedId !== undefined) queryParams["Filters.NeedId"] = NeedId;

        if (PriceRange) {
            if (PriceRange.MinPrice !== undefined)
                queryParams["Filters.PriceRange.MinPrice"] =
                    PriceRange.MinPrice;
            if (PriceRange.MaxPrice !== undefined)
                queryParams["Filters.PriceRange.MaxPrice"] =
                    PriceRange.MaxPrice;
        }
    }
    return axios.get("/api/products/get", {
        headers,
        params: queryParams,
    });
};
const handGetProduct = () => {
    return axios.post(`/api/products/get`, { headers });
};
const handleCreateProduct = (formData: addProductType) => {
    return axios.post(`/api/products/create`, formData, { headers });
};
const handleUpdateProduct = (formData: addProductType) => {
    const { id } = formData;
    return axios.patch(`/api/products/update/${id}`, formData, {
        headers,
    });
};
const handleDeleteProduct = (productId: number) => {
    return axios.delete(`/api/products/delete/${productId}`, { headers });
};
const handleCreateNewProductVersion = (formData: cretaeProductVersionType) => {
    return axios.post(`/api/products/version/create`, formData, { headers });
};
const handleUpdateNewProductVersion = (
    formData: cretaeProductVersionType,
    productVersionId: number
) => {
    return axios.patch(
        `/api/products/version/update/${productVersionId}`,
        formData,
        { headers }
    );
};
const handleDeleteProductVersion = (productVersionId: number) => {
    return axios.delete(`/api/products/version/delete/${productVersionId}`, {
        headers,
    });
};
export {
    handleGetAllProducts,
    handGetProduct,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleCreateNewProductVersion,
    handleUpdateNewProductVersion,
    handleDeleteProductVersion,
};
