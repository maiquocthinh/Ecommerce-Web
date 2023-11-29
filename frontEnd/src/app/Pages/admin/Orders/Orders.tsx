import SelecterFilter from "@/Components/FormData/Selecter/SelecterFilter";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import {
    adminListOrder,
    adminUpdateStatus,
} from "@/app/action/adminAction/adminOrder";
import { orderType } from "@/common/Order";
import { getOrderType } from "@/common/getAllType";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const initFormData = {
    CustomerName: "",
    Status: "",
    StartDate: "",
    EndDate: "",
    pageIndex: 0,
    pageSize: 0,
};
const Orders = () => {
    const router = useNavigate();
    const dispatch = useDispatch<any>();
    const [isNewOrder, setISNewOrder] = useState<boolean>(false);
    const [formData, setFormData] = useState<getOrderType>(initFormData);
    const [isUpdateOrder, setISUpdateOrder] = useState<boolean>(false);
    const [pagi, setPagi] = useState<pagingType>({});
    const [dataOrder, setDataOrder] = useState<orderType[]>([]);
    const listOrderData = useSelector((state: any) => state.listOrderData.data);
    const handleSearchOrder = () => {
        if (formData.CustomerName && formData.CustomerName.trim() !== "") {
            dispatch(
                adminListOrder({
                    pageSize: 6,
                    pageIndex: listOrderData.data.paging.pageIndex,
                    CustomerName: formData.CustomerName.trim(),
                })
            );
        }
    };
    useEffect(() => {
        dispatch(adminListOrder({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    useEffect(() => {
        if (listOrderData?.success && listOrderData.data) {
            setPagi({ ...listOrderData.data?.paging });
            setDataOrder(listOrderData?.data?.list);
            setFormData({
                ...formData,
                pageIndex: listOrderData.data?.paging.pageIndex,
                pageSize: listOrderData.data?.paging.pageSize,
            });
        }
    }, [listOrderData]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (formData.CustomerName && formData.CustomerName.trim() !== "") {
                dispatch(
                    adminListOrder({
                        pageSize: 6,
                        pageIndex: newPage,
                        CustomerName: formData.CustomerName.trim(),
                    })
                );
            } else {
                dispatch(adminListOrder({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleResetOrder = () => {
        setFormData(initFormData);
        dispatch(
            adminListOrder({
                pageSize: 6,
                pageIndex: listOrderData.data.paging.pageIndex || 1,
            })
        );
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleAddOrUpdateOrder = async () => {
        if (
            true
            // formData.title.trim() !== "" &&
            // formData.description.trim() !== ""
        ) {
            // if (!isUpdateOrder) {
            //     const res = await dispatch(adminCreateOrder({ ...formData }));
            //     try {
            //         if (res.payload.success) {
            //             dispatch(
            //                 adminListOrder({
            //                     pageIndex:
            //                         listOrderData.data.paging.pageIndex || 1,
            //                     pageSize:
            //                         listOrderData.data.paging.pageSize || 6,
            //                 })
            //             );
            //             toast.success("tạo mới Nhu cầu thành công!");
            //             setFormData(initFormData);
            //             setISNewOrder(false);
            //         } else {
            //             toast.error(
            //                 `tạo mới Nhu cầu thất bại! ${res.payload.message}`
            //             );
            //         }
            //     } catch (error) {
            //         toast.error(
            //             `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
            //         );
            //     }
            // } else {
            //     const res = await dispatch(adminEditOrder({ ...formData }));
            //     try {
            //         if (res.payload.success) {
            //             dispatch(
            //                 adminListOrder({
            //                     pageIndex:
            //                         listOrderData.data.paging.pageIndex || 1,
            //                     pageSize:
            //                         listOrderData.data.paging.pageSize || 6,
            //                 })
            //             );
            //             toast.success("chỉnh sửa Nhu cầu thành công!");
            //             setFormData(initFormData);
            //             setISNewOrder(false);
            //         } else {
            //             toast.error(
            //                 `chỉnh sửa Nhu cầu thất bại! ${res.payload.message}`
            //             );
            //         }
            //     } catch (error) {
            //         toast.error(
            //             `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
            //         );
            //     }
            // }
        }
    };
    const handleDeleteOrder = async (id: number) => {
        if (id > 0) {
            // const res = await dispatch(adminDeleteOrder(id));
            // try {
            //     if (res.payload.success) {
            //         toast.success("xóa Nhu cầu thành công!");
            //         dispatch(
            //             adminListOrder({
            //                 pageIndex:
            //                     listOrderData.data.paging.pageIndex || 1,
            //                 pageSize: listOrderData.data.paging.pageSize || 6,
            //                 name: searchValue,
            //             })
            //         );
            //     } else {
            //         toast.error(
            //             `tạo mới Nhu cầu thất bại! ${res.payload.message}`
            //         );
            //     }
            // } catch (error) {
            //     toast.error(
            //         `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
            //     );
            // }
        }
    };
    const handleEditOrder = (category: any) => {
        setISNewOrder(true);
        setISUpdateOrder(true);
        setFormData({ ...category });
    };
    const handleGetOptionBySelect = async (
        option: { title: string; id: number; defaultStatus?: string },
        typeId: string
    ) => {
        if (typeId === "filterStatus") {
            setFormData({ ...formData, Status: option.title });
        } else if (option.defaultStatus === "cancelled") {
            toast.error("không thể cập nhật đơn hàng đã hủy");
        } else if (
            (option.defaultStatus === "delivering" ||
                option.defaultStatus === "shipped") &&
            (option.title === "cancelled" || option.title === "processing")
        ) {
            toast.error(
                "không thể hủy đơn hoặc sử lí hàng đang vận chuyển hoặc đang giao hàng"
            );
        } else if (option.title && option.id > 0) {
            const res = await dispatch(
                adminUpdateStatus({
                    status: option.title,
                    orderId: option.id,
                })
            );
            try {
                if (res.payload.success) {
                    toast.success("cập nhật status thành công");
                    dispatch(
                        adminListOrder({
                            pageIndex: pagi.pageIndex || 1,
                            pageSize: pagi.pageSize || 6,
                        })
                    );
                } else {
                    toast.error(
                        `cập nhật status thất bại! ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        } else {
            toast.error("vui lòng chọn đúng status và order");
        }
    };
    const handleFilterProduct = () => {
        dispatch(adminListOrder(formData));
    };
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
                Orders
            </h1>
            <div className="rounded-lg  min-w-0 shadow-xs bg-white dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <div>
                        <div className="flex justify-between items-center gap-4">
                            <input
                                className="flex-1 w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                type="search"
                                name="CustomerName"
                                placeholder="Search by order Name"
                                value={formData.CustomerName}
                                onChange={handleOnChange}
                            />
                            <div className="min-w-[20%]">
                                <button
                                    onClick={handleSearchOrder}
                                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-around gap-2 mt-4">
                            <div className="w-1/5">
                                <label className="block text-sm text-gray-800 dark:text-gray-400">
                                    Start Date
                                </label>
                                <input
                                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                    type="date"
                                    name="startDate"
                                    value={formData?.StartDate}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="w-1/5">
                                <label className="block text-sm text-gray-800 dark:text-gray-400">
                                    End Date
                                </label>
                                <input
                                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                    type="date"
                                    name="EndDate"
                                    value={formData?.EndDate}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="w-1/6">
                                <label className="block text-sm text-gray-800 dark:text-gray-400">
                                    status
                                </label>
                                <SelecterFilter
                                    handleGetOptionBySelect={
                                        handleGetOptionBySelect
                                    }
                                    options={[
                                        {
                                            id: 1,
                                            title: "processing",
                                        },
                                        {
                                            id: 2,
                                            title: "shipped",
                                        },
                                        {
                                            id: 3,
                                            title: "delivering",
                                        },
                                        {
                                            id: 4,
                                            title: "cancelled",
                                        },
                                    ]}
                                    typeId="filterStatus"
                                    h="48px"
                                />
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <div className="w-full mx-1">
                                    <label className="block text-sm text-gray-800 dark:text-gray-400">
                                        Filter
                                    </label>
                                    <button
                                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                        onClick={handleFilterProduct}
                                    >
                                        Filter
                                    </button>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm text-gray-800 dark:text-gray-400">
                                        Reset
                                    </label>
                                    <button
                                        className="align-bottom leading-5 transition-colors duration-150 font-medium  text-gray-600 dark:text-gray-400 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 px-4 w-full mr-3 flex items-center justify-center cursor-pointer h-12 md:py-1 py-3 text-sm dark:bg-gray-700"
                                        onClick={handleResetOrder}
                                    >
                                        <span className="text-black dark:text-gray-200">
                                            Reset
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">ID</td>
                            <td className="px-4 py-2">Customer Name</td>
                            <td className="px-4 py-2">PRICE</td>
                            <td className="px-4 py-2">ADDRESS</td>
                            <td className="px-4 py-2">PHONENUMBER</td>
                            <td className="px-4 py-2">STATUS</td>
                            <td className="px-4 py-2">ACTION</td>
                            <td className="px-4 py-2 text-right">INVOICE</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                        {dataOrder?.length &&
                            dataOrder.map((order) => (
                                <tr className="bg-custom-addmin_bg">
                                    <td className="px-4 py-2">
                                        <span className="font-semibold uppercase text-xs">
                                            {order.orderId}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {order.shippingInfo.recipientName}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">
                                            {order.totalAmount}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {order.shippingInfo.address}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {order.shippingInfo.phoneNumber}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-xs">
                                        <span className="font-serif">
                                            <span
                                                className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600 bg-opacity-50"
                                                style={{
                                                    backgroundColor:
                                                        order.orderStatus ===
                                                        "processing"
                                                            ? "#e4a11b"
                                                            : order.orderStatus ===
                                                              "shipped"
                                                            ? "#14a44d"
                                                            : order.orderStatus ===
                                                              "cancelled"
                                                            ? "#dc4c64"
                                                            : "#54d4d3",
                                                }}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <SelecterFilter
                                            handleGetOptionBySelect={
                                                handleGetOptionBySelect
                                            }
                                            options={
                                                order.orderStatus ===
                                                "cancelled"
                                                    ? [
                                                          {
                                                              id: order.orderId,
                                                              title: "cancelled",
                                                              defaultStatus:
                                                                  order.orderStatus,
                                                          },
                                                      ]
                                                    : [
                                                          {
                                                              id: order.orderId,
                                                              title: "processing",
                                                              defaultStatus:
                                                                  order.orderStatus,
                                                          },
                                                          {
                                                              id: order.orderId,
                                                              title: "shipped",
                                                              defaultStatus:
                                                                  order.orderStatus,
                                                          },
                                                          {
                                                              id: order.orderId,
                                                              title: "delivering",
                                                              defaultStatus:
                                                                  order.orderStatus,
                                                          },
                                                          {
                                                              id: order.orderId,
                                                              title: "cancelled",
                                                              defaultStatus:
                                                                  order.orderStatus,
                                                          },
                                                      ]
                                            }
                                            typeId="orderAction"
                                            defaultValue={order.orderStatus}
                                        />
                                    </td>

                                    <td className="px-4 py-2 text-right flex justify-end">
                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={() =>
                                                    router(
                                                        `/admin/order-detail/${order.orderId}`
                                                    )
                                                }
                                                className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
                                            >
                                                <AiOutlinePrinter size={22} />
                                            </button>
                                            <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                                                <LiaSearchPlusSolid size={22} />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {dataOrder && (
                    <Paginations
                        handlePageChange={handlePageChange}
                        pagination={{
                            currentPage: pagi.pageIndex || 0,
                            totalPage: pagi.totalPages || 0,
                        }}
                        paging={pagi}
                    />
                )}
            </div>
            <Notification />
        </div>
    );
};

export default Orders;
