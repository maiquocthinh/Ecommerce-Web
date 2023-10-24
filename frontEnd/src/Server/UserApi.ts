import { UserRegisterType, userLoginType } from "../common/user";
import axios from "../utils/instance";
const handleRegister = (formData:UserRegisterType) => {
    return axios.post(`https://reqres.in/api/register`,formData);
};
const handleLogin = (formData:userLoginType) => {
    return axios.post(`https://reqres.in/api/login`,formData);
}
export {
    handleRegister,
    handleLogin
}