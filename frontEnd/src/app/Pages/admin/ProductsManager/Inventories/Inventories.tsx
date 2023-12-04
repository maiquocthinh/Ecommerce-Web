import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import { adminGetAllInventory } from "@/app/action/adminAction/adminInventory";
import { getListSupplier } from "@/app/action/adminAction/adminSupplier";
import {
    allInventoryType,
    importShipmentsgetType,
    importsCreateType,
} from "@/common/Inventory";
import { getDisscountType, supplierType } from "@/common/getAllType";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
const initFormData = {
    productVersionId: 0,
    quantity: 0,
    cost: 0,
};
const Inventories = () => {
    const dispatch = useDispatch<any>();
    const allInventory = useSelector((state: any) => state.allInventory.data);
    const listSuplierData = useSelector(
        (state: any) => state.listSuplierData.data
    ) as {
        data: { list: supplierType[]; paging: pagingType };
        success: boolean;
    };
    const [paging, setPaging] = useState<pagingType>();
    const [inventories, setInventories] = useState<allInventoryType[]>();
    const [idSupplier, setIdSupplier] = useState<number>(0);
    const [formParam, setFormParam] = useState<getDisscountType>({
        pageIndex: 1,
        pageSize: 6,
    });
    const [formData, setFormData] =
        useState<importShipmentsgetType>(initFormData);
    const [isNewImport, setIsNewImport] = useState<boolean>(false);
    useEffect(() => {
        dispatch(adminGetAllInventory({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    useEffect(() => {
        if (isNewImport && !listSuplierData.success) {
            dispatch(getListSupplier({ pageIndex: 1, pageSize: 100 }));
        }
    }, [dispatch, isNewImport, listSuplierData]);
    useEffect(() => {
        if (allInventory.success) {
            setInventories(allInventory?.data?.list);
            setPaging(allInventory?.data?.paging);
        }
    }, [allInventory]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (formParam?.ProductName && formParam.ProductName.trim() !== "") {
                dispatch(
                    adminGetAllInventory({
                        pageSize: 6,
                        pageIndex: newPage,
                        Keyword: formParam.ProductName.trim(),
                    })
                );
            } else {
                dispatch(
                    adminGetAllInventory({ pageSize: 6, pageIndex: newPage })
                );
            }
        }
    };
    const handleDate = (time: string) => {
        const date = new Date(time);
        return `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`;
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormParam({ ...formParam, [e.target.name]: e.target.value });
    };
    const handleSearhInventories = () => {
        if (formParam.ProductName && formParam.ProductName.trim() !== "") {
            dispatch(
                adminGetAllInventory({
                    pageSize: paging?.pageSize || 6,
                    pageIndex: paging?.pageIndex || 1,
                    Keyword: formParam.ProductName.trim(),
                })
            );
        }
    };
    const handleResetSearchInventories = () => {
        setFormParam({ ...formParam, ProductName: "" });
        dispatch(
            adminGetAllInventory({
                pageSize: paging?.pageSize || 6,
                pageIndex: paging?.pageIndex || 1,
            })
        );
    };
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        setIdSupplier(option?.id);
    };
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg  min-w-0 shadow-xs bg-white dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <div>
                        <div className="flex justify-between items-center gap-4">
                            <input
                                className="flex-1 w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                type="search"
                                name="ProductName"
                                placeholder="Search by product Name"
                                value={formParam.ProductName}
                                onChange={handleOnChange}
                            />
                            <div className="flex items-center gap-1">
                                <div className="min-w-[120px]">
                                    <button
                                        disabled={
                                            formParam.ProductName?.trim() === ""
                                        }
                                        onClick={handleSearhInventories}
                                        className="disabled:bg-custom-disable disabled:border-custom-disable align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                    >
                                        Search
                                    </button>
                                </div>
                                <div className="min-w-[20%] mx-1">
                                    <button
                                        disabled={
                                            formParam.ProductName?.trim() === ""
                                        }
                                        className="disabled:bg-custom-disable disabled:border-custom-disable align-bottom leading-5 transition-colors duration-150 font-medium  text-gray-600  dark:text-gray-400 focus:outline-none rounded-lg border bg-gray-200 border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm dark:bg-gray-700"
                                        onClick={handleResetSearchInventories}
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
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg rounded-b-lg">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">
                                    ID PRODUCT VERSION
                                </td>
                                <td className="px-4 py-2">
                                    TÊN PRODUCT VESION
                                </td>
                                <td className="px-4 py-2">IMAGE</td>
                                <td className="px-4 py-2">HÀNG TỒN KHO</td>
                                <td className="px-4 py-2">TRẠNG THÁI</td>
                                <td className="px-4 py-2 text-right">ACTION</td>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                            {inventories?.length &&
                                inventories.map((item, index: number) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">
                                                {item.productVersionId}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.productVersionName}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <img
                                                src={item.imageUrl}
                                                alt=""
                                                className={`w-[30px] h-[30px] object-contain`}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.inventory}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.isOutOfStock
                                                    ? "còn hàng"
                                                    : "hết hàng"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-end text-right">
                                                <button
                                                    onClick={() =>
                                                        setIsNewImport(true)
                                                    }
                                                    className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                                >
                                                    <MdOutlineAddBox
                                                        size={22}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {allInventory && paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage: paging.pageIndex || 0,
                                totalPage: paging.totalPages || 0,
                            }}
                            paging={paging}
                        />
                    )}
                </div>
                <CenterModal
                    show={isNewImport}
                    setShow={setIsNewImport}
                    showModalTitle={true}
                    modalTitle={
                        <h1 className="text-2xl font-bold text-white">
                            thêm hàng cho sản phẩm
                        </h1>
                    }
                    bgAll="bg"
                    mainContent={
                        <div className="flex flex-col justify-between items-start gap-4">
                            <div className="w-full">
                                <p className="text-gray-300 text-sm text-start">
                                    chọn nhà cung cấp :
                                </p>
                                {listSuplierData?.data?.list?.length ? (
                                    <SelecterLab
                                        options={listSuplierData?.data?.list}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        typeId="Suplier"
                                    />
                                ) : null}
                            </div>
                        </div>
                    }
                    showButtons={true}
                    buttonComponent={
                        <div className="flex gap-2 justify-center mb-2">
                            <button
                                // onClick={handleAddOrUpdateRoles}
                                className="px-4 py-2 border-b-4 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-200"
                            >
                                Thêm Lô hàng
                            </button>
                            <button
                                // onClick={handleAddOrUpdateRoles}
                                className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                            >
                                Tạo
                            </button>

                            <button
                                onClick={() => {
                                    setIsNewImport(false);
                                }}
                                className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                            >
                                Đóng
                            </button>
                        </div>
                    }
                />
                <Notification />
            </div>
        </div>
    );
};

export default Inventories;
