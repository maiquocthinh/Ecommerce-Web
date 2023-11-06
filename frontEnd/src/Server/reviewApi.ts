import axios from "../utils/instance";
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handlegetAllReview = (productId: number) => {
    return axios.get(`api/reviews/${productId}`, { headers });
};
export { handlegetAllReview };
