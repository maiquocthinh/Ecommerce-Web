import Cookies from "js-cookie";
import axios from "../utils/instance";
import { userLoginType } from "@/common/user";
import { employeeType } from "@/common/employee";
import { getEmployeesType } from "@/common/getAllType";
const headers = {
    Authorization: `Bearer ${Cookies.get("AdminToken")}`,
};
const createEmployeesParams = (
    formData: getEmployeesType
): Record<string, any> => {
    const queryParams: Record<string, any> = {};

    if (formData.Keyword) queryParams.Keyword = formData.Keyword;
    if (formData.pageIndex !== undefined)
        queryParams.pageIndex = formData.pageIndex;
    if (formData.pageSize !== undefined)
        queryParams.pageSize = formData.pageSize;
    if (formData.RoleId !== undefined) queryParams.RoleId = formData.RoleId;

    return queryParams;
};
const handleLoginAdmin = (formData: userLoginType) => {
    return axios.post(`/api/auth/employee/login`, formData);
};
const handleLogoutAdmin = () => {
    return axios.delete(`/api/auth/employee/logout`);
};
const handleGetEmployee = (employeeId: number) => {
    return axios.get(`/api/employees/${employeeId}`, { headers });
};
const handleGetAllEmployees = (formData: getEmployeesType) => {
    const queryParams = createEmployeesParams(formData);

    return axios.get("/api/employees", {
        headers,
        params: queryParams,
    });
};
const handleCreateEmployee = (formData: employeeType) => {
    console.log(formData);
    return axios.post(`/api/employees`, formData, { headers });
};
const handleUpdateEmployee = (formData: employeeType) => {
    const { id } = formData;
    return axios.patch(`/api/employees/${id}`, formData, { headers });
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
    handleGetEmployee,
    handleCreateEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleGetProfileEmployee,
    handleUpdateProfileEmployee,
};
