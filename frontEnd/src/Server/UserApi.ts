import Cookies from "js-cookie";
import { UserRegisterType, userLoginType } from "../common/user";
import axios from "../utils/instance";
const handleRegister = (formData: UserRegisterType) => {
    return axios.post(`/api/auth/customer/register`, formData);
};
const handleLogin = (formData: userLoginType) => {
    return axios.post(`/api/auth/customer/login`, formData);
};
const handleResetPassword = (dataReset: {
    email?: string;
    token?: string;
    password?: string;
}) => {
    const { email, token, password } = dataReset;
    if (token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        return axios.post(
            `/api/auth/customer/reset-password`,
            { password },
            { headers }
        );
    } else {
        return axios.post(`/api/auth/customer/request-reset-password`, {
            email,
        });
    }
};
const handleGetProfile = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/customer/profile`, { headers });
};

export { handleRegister, handleLogin, handleGetProfile, handleResetPassword };
