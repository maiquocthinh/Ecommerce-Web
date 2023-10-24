import axios from "../utils/instance";
const handleGetAllProduct = (limit?:number,product?:string) => {
    if(!limit) limit =10;
    if(!product) product ="mobile";
    return axios.get(`/api/${product}?_limit=${limit}`);
};
const handleGetSaleProduct = () => {
    return axios.get(`/api/sale`);
};
const handleGetPosterSale = () => {
    return axios.get(`/api/poster`);
};
const handleGetDevices= () => {
    return axios.get(`/api/device`);
};
const handleGetProductById = (id:string|number) => {
    return axios.get(`/api/product?id=${id}`);
}
export {
    handleGetAllProduct,
    handleGetSaleProduct,
    handleGetPosterSale,
    handleGetDevices,
    handleGetProductById
}