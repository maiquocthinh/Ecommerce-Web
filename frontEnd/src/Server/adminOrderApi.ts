import { getOrderType } from "@/common/getAllType";
import Cookies from "js-cookie";
import axios from "../utils/instance";
const headers = {
    Authorization: `Bearer ${Cookies.get("AdminToken")}`,
};

const handleGetListOrder = (formData: getOrderType) => {
    const { pageIndex, pageSize, CustomerName, EndDate, StartDate, Status } =
        formData;
    const queryParams: any = {};
    if (CustomerName) queryParams.CustomerName = CustomerName;
    if (Status) queryParams.Status = Status;
    if (EndDate) queryParams.EndDate = EndDate;
    if (StartDate) queryParams.StartDate = StartDate;
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;

    return axios.get("/api/orders/list", {
        headers,
        params: queryParams,
    });
};
const handleGetOrderDetail = (orderId: number) => {
    return axios.get(`/api/orders/${orderId}`, { headers });
};
const handleUpdateStatus = (formData: { orderId: number; status: string }) => {
    const { orderId, status } = formData;
    return axios.post(`/api/orders/${orderId}`, { status }, { headers });
};
const handleUpdateOrderDetail = (param: {
    orderDetailId: number;
    importShipmentId: number;
}) => {
    return axios.patch(
        `/api/order-detail/${param.orderDetailId}`,
        param.importShipmentId,
        {
            headers,
        }
    );
};
export {
    handleGetListOrder,
    handleGetOrderDetail,
    handleUpdateOrderDetail,
    handleUpdateStatus,
};
