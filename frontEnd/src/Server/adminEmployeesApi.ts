import Cookies from "js-cookie";
import axios from "../utils/instance";
import { userLoginType } from "@/common/user";
import { employeeType } from "@/common/employee";
const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
};
const handleLoginAdmin = (formData: userLoginType) => {
    return axios.post(`/api/auth/employee/login`, formData);
};
const handleLogoutAdmin = () => {
    return axios.delete(`/api/auth/employee/logout`);
};
const handleGetEmoloyee = (employeeId: number) => {
    return axios.get(`/api/employees/${employeeId}`, { headers });
};
const handleGetAllEmployees = (formData: {
    pageSize?: number;
    pageIndex?: number;
    RoleId?: number;
    Keyword?: number;
}) => {
    let { pageSize, pageIndex } = formData;
    if (!pageSize) pageSize = 10;
    if (!pageIndex) pageIndex = 1;
    return axios.get(
        `/api/employees&pageSize=${pageSize}&pageIndex=${pageIndex}`,
        { headers }
    );
};
const handleCreateEmployee = (formData: employeeType) => {
    return axios.post(`/api/employees`, formData, { headers });
};
const handleUpdateEmployee = (formData: employeeType, employeeId: number) => {
    return axios.patch(`/api/employees/${employeeId}`, formData, { headers });
};
const handleDeleteEmployee = (employeeId: number) => {
    return axios.delete(`/api/employees/${employeeId}`, { headers });
};
const handleGetProfileEmployee = () => {
    return axios.get(`/api/employees/profile`, { headers });
};
const handleUpdateProfileEmployee = (formData: employeeType) => {
    return axios.patch(`/api/employees/profile`, formData, { headers });
};
export {
    handleLoginAdmin,
    handleLogoutAdmin,
    handleGetAllEmployees,
    handleGetEmoloyee,
    handleCreateEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleGetProfileEmployee,
    handleUpdateProfileEmployee,
};
