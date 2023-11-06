import SideBarProfile from "@/Components/profileListing/SideBarProfile/SideBarProfile";
import { orderType } from "@/common/Order";
import { useState, useEffect } from "react";
import { BiReset, BiSearchAlt } from "react-icons/Bi";
import { CiFilter } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../action/Order";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import PageLoader from "@/Components/PageLoader/PageLoader";
const Order = () => {
    const [isOrderDetail, setIsOrderDetail] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [orderSearch, setOrderSearch] = useState<orderType[]>([]);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const allOrder = useSelector(
        (state: any) => state.allOrder.data as orderType[]
    );
    const pageLevelLoading = useSelector(
        (sate: any) => sate.pageLevelLoading.pageLevelLoading
    );
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(setPageLevelLoading(true));
        dispatch(getAllOrder());
    }, [dispatch]);
    useEffect(() => {
        if (searchValue !== "" && isSearch && allOrder?.length) {
            const filteredOrders = allOrder.filter((order) =>
                order.orderDetails.some(
                    (orderDetail) =>
                        orderDetail.productVersionName === searchValue
                )
            );
            if (filteredOrders.length > 0) {
                setOrderSearch(filteredOrders);
            } else {
                setOrderSearch([]);
            }
        }
    }, [searchValue, isSearch, allOrder]);
    useEffect(() => {
        if (allOrder?.length > 0) {
            dispatch(setPageLevelLoading(false));
        }
    }, [allOrder, dispatch]);
    if (pageLevelLoading) {
        return <PageLoader pageLevelLoading={pageLevelLoading} />;
    }
    return (
        <div className="flex gap-4 min-h-full">
            <div className="w-[20%] border-r-[1px] bg-white rounded-t-borderContnet overflow-hidden">
                <SideBarProfile />
            </div>
            <div className="w-[80%] flex flex-col gap-4">
                <div className="mx-auto max-w-screen-xl bg-white">
                    <h1 className="ml-5 text-2xl font-bold text-gray-900 uppercase mt-2">
                        danh sách các đơn hàng của bạn
                    </h1>
                </div>
                <div className="flex bg-gray-50">
                    <div className="flex-1 mx-auto px-2">
                        <div className="mt-4 w-full">
                            <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                                <form className="relative flex w-full max-w-2xl items-center">
                                    <BiSearchAlt className="absolute left-2 block h-5 w-5 text-gray-400" />
                                    <input
                                        type="name"
                                        name="search"
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                        className="h-12 border-b w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none"
                                        placeholder="tìm kiếm bằng tên hàng"
                                    />
                                </form>
                                {isSearch ? (
                                    <button
                                        onClick={() => {
                                            setIsSearch(false);
                                            setOrderSearch([]);
                                            setSearchValue("");
                                        }}
                                        type="button"
                                        className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
                                    >
                                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                        <BiReset className="mr-2 h-3 w-3" />
                                        tải lại
                                    </button>
                                ) : (
                                    <button
                                        disabled={searchValue === ""}
                                        onClick={() => setIsSearch(true)}
                                        type="button"
                                        className="disabled:text-custom-disable disabled:pointer-events-none relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
                                    >
                                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                        <CiFilter className="mr-2 h-3 w-3" />
                                        tìm kiếm
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                                <thead className="hidden border-b lg:table-header-group">
                                    <tr className="uppercase">
                                        <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                                            mã đơn
                                        </td>

                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                            mô tả đơn hàng
                                        </td>

                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                            thông tin người nhận
                                        </td>

                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                            giá
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="float-right mt-1 h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                                />
                                            </svg>
                                        </td>

                                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                            trạng thái
                                        </td>
                                    </tr>
                                </thead>

                                <tbody className="bg-white lg:border-gray-300">
                                    {orderSearch?.length
                                        ? orderSearch.map((order) => (
                                              <tr
                                                  onClick={() =>
                                                      setIsOrderDetail(
                                                          !isOrderDetail
                                                      )
                                                  }
                                                  className="hover:bg-slate-100 cursor-pointer"
                                              >
                                                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                                      {order.orderId}
                                                  </td>
                                                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                      <div className="flex flex-col gap-1">
                                                          {order.orderDetails.map(
                                                              (
                                                                  orderDetails
                                                              ) => (
                                                                  <span>
                                                                      {`${
                                                                          orderDetails.productVersionName
                                                                      } ${
                                                                          orderDetails.quantity ===
                                                                          1
                                                                              ? ""
                                                                              : `x ${orderDetails.quantity}`
                                                                      }`}
                                                                  </span>
                                                              )
                                                          )}
                                                      </div>
                                                  </td>
                                                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                                                      <div className="flex flex-col gap-1">
                                                          <span>
                                                              {`${order.shippingInfo.address}`}
                                                          </span>
                                                          <span>
                                                              {`${order.shippingInfo.recipientName} - ${order.shippingInfo.phoneNumber}`}
                                                          </span>
                                                      </div>
                                                  </td>
                                                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                                      <span>
                                                          {order.totalAmount}
                                                      </span>
                                                  </td>
                                                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                                      <span
                                                          className={`ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800 ${
                                                              order.orderStatus ===
                                                              "cancelled"
                                                                  ? "bg-red-500 text-white text-center"
                                                                  : order.orderStatus ===
                                                                    "processing"
                                                                  ? "bg-yellow-600 text-white text-center"
                                                                  : "bg-green-600 text-white text-center"
                                                          }
                                                     ""
                                                 }`}
                                                      >
                                                          {order.orderStatus}
                                                      </span>
                                                  </td>
                                              </tr>
                                          ))
                                        : allOrder?.length &&
                                          allOrder.map((order) => (
                                              <tr
                                                  onClick={() =>
                                                      setIsOrderDetail(
                                                          !isOrderDetail
                                                      )
                                                  }
                                                  className="hover:bg-slate-100 cursor-pointer"
                                              >
                                                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                                      {order.orderId}
                                                  </td>
                                                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                      <div className="flex flex-col gap-1">
                                                          {order.orderDetails.map(
                                                              (
                                                                  orderDetails
                                                              ) => (
                                                                  <span>
                                                                      {`${
                                                                          orderDetails.productVersionName
                                                                      } ${
                                                                          orderDetails.quantity ===
                                                                          1
                                                                              ? ""
                                                                              : `x ${orderDetails.quantity}`
                                                                      }`}
                                                                  </span>
                                                              )
                                                          )}
                                                      </div>
                                                  </td>
                                                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                                                      <div className="flex flex-col gap-1">
                                                          <span>
                                                              {`${order.shippingInfo.address}`}
                                                          </span>
                                                          <span>
                                                              {`${order.shippingInfo.recipientName} - ${order.shippingInfo.phoneNumber}`}
                                                          </span>
                                                      </div>
                                                  </td>
                                                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                                      <span>
                                                          {order.totalAmount}đ
                                                      </span>
                                                  </td>
                                                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                                      <span
                                                          className={`ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800 ${
                                                              order.orderStatus ===
                                                              "cancelled"
                                                                  ? "bg-red-500 text-white text-center"
                                                                  : order.orderStatus ===
                                                                    "processing"
                                                                  ? "bg-yellow-600 text-white text-center"
                                                                  : "bg-green-600 text-white text-center"
                                                          }
                                                        ""
                                                    }`}
                                                      >
                                                          {order.orderStatus}
                                                      </span>
                                                  </td>
                                              </tr>
                                          ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {isOrderDetail && (
                        <div>
                            <div className="relative my-10 flex h-full flex-col overflow-hidden rounded-2xl bg-white text-gray-600 shadow-lg ring-1 ring-gray-200">
                                <div className="border-b p-6">
                                    <h6 className="mb-2 text-base font-semibold">
                                        Orders overview
                                    </h6>
                                    <p className="mb-4 text-sm font-light">
                                        <i
                                            className="inline-block font-black not-italic text-green-600"
                                            aria-hidden="true"
                                        ></i>
                                        <span className="font-semibold">
                                            24%
                                        </span>{" "}
                                        this month
                                    </p>
                                </div>
                                <div className="flex-auto p-6">
                                    <div className="relative flex flex-col justify-center">
                                        <div className="absolute left-4 h-full border-r-2"></div>
                                        <div className="relative mb-4">
                                            <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">
                                                A
                                            </span>
                                            <div className="ml-12 w-auto pt-1">
                                                <h6 className="text-sm font-semibold text-blue-900">
                                                    $2400, Design changes
                                                </h6>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    22 DEC 7:20 PM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative mb-4">
                                            <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">
                                                B
                                            </span>
                                            <div className="ml-12 w-auto pt-1">
                                                <h6 className="text-sm font-semibold text-blue-900">
                                                    New order #1832412
                                                </h6>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    21 DEC 11 PM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative mb-4">
                                            <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">
                                                C
                                            </span>
                                            <div className="ml-12 w-auto pt-1">
                                                <h6 className="text-sm font-semibold text-blue-900">
                                                    Server payments for April
                                                </h6>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    21 DEC 9:34 PM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative mb-4">
                                            <span className="absolute inline-flex h-6 w-6 items-center justify-center text-center text-base font-semibold">
                                                <span className="text-xl text-orange-600"></span>
                                            </span>
                                            <div className="ml-12 w-auto pt-1">
                                                <h6 className="text-sm font-semibold text-blue-900">
                                                    New card added for order
                                                    #4395133
                                                </h6>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    20 DEC 2:20 AM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative mb-4">
                                            <span className="absolute inline-flex h-6 w-6 items-center justify-center text-center text-base font-semibold">
                                                <span className="text-xl text-red-600"></span>
                                            </span>
                                            <div className="ml-12 w-auto pt-1">
                                                <h6 className="text-sm font-semibold text-blue-900">
                                                    Unlock packages for
                                                    development
                                                </h6>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    18 DEC 4:54 AM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute inline-flex h-6 w-6 items-center justify-center text-center text-base font-semibold">
                                                <span className="text-xl text-blue-900"></span>
                                            </span>
                                            <div className="ml-12 w-auto pt-1">
                                                <h6 className="text-sm font-semibold text-blue-900">
                                                    New order #9583120
                                                </h6>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    17 DEC
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Order;
