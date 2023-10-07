import axios from "../utils/instance";
const handleGetAllProduct = (limit?:number,product?:string) => {
    if(!limit) limit =10;
    if(!product) product ="mobile";
    return axios.get(`/api/${product}?_limit=${limit}`);
};
const handleGetSaleProduct = () => {
    return axios.get(`/api/sale`);
};
export {
    handleGetAllProduct,
    handleGetSaleProduct
}