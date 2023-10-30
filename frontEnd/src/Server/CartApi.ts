
import axios from "../utils/instance";
const handleAddToCart = (formData:any) => {
    return axios.post(`/api/cart`,formData);
};
const handleAllCart = (userId:number) => {
    return axios.get(`/api/cart`);
};
export {
    handleAddToCart,
    handleAllCart
}