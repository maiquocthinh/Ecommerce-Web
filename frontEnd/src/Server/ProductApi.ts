import axios from "../utils/instance";
const handleGetAllProduct = (limit:number) => {
    if(!limit) limit =10;
    return axios.get(`/api/products?_limit=${limit}`);
};
export {
    handleGetAllProduct
}