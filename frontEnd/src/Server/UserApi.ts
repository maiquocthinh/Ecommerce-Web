import Cookies from "js-cookie";
import { UserRegisterType, userLoginType } from "../common/user";
import axios from "../utils/instance";
const handleRegister = (formData: UserRegisterType) => {
    console.log(formData);
    return axios.post(`/api/auth/customer/register`, formData);
};
const handleLogin = (formData: userLoginType) => {
    return axios.post(`/api/auth/customer/login`, formData);
};
const handleResetPassword = (email: string) => {
    return axios.post(`/api/auth/customer/request-reset-password`, { email });
};
const handleGetProfile = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/customer/profile`, { headers });
};

export { handleRegister, handleLogin, handleGetProfile, handleResetPassword };
