import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import { adminAllImports } from "@/app/action/adminAction/adminInventory";
import { importShipmentsType, importsType } from "@/common/Inventory";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
const initFormData = {
    supplierId: 0,
    importShipments: [
        {
            productVersionId: 0,
            quantity: 0,
            cost: 0,
        },
    ],
};
const Imports = () => {
    const dispatch = useDispatch<any>();
    const allImports = useSelector((state: any) => state.allImports.data);
    const [paging, setPaging] = useState<pagingType>();
    const [importData, setimportData] = useState<importsType[]>();
    const [formData, setFormData] = useState<importShipmentsType>(initFormData);
    const [isNewImport, setisNewImport] = useState<boolean>(false);
    useEffect(() => {
        dispatch(adminAllImports({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    useEffect(() => {
        if (allImports.success) {
            setimportData(allImports?.data?.list);
            setPaging(allImports?.data?.paging);
        }
    }, [allImports]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            dispatch(adminAllImports({ pageSize: 6, pageIndex: newPage }));
        }
    };
    const handleDate = (time: string) => {
        const date = new Date(time);
        return `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`;
    };
    return (
        <div className="flex flex-col p-4">
            <h1 className="font-bold text-2xl text-white py-4 px-2">
                Import manager
            </h1>
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg rounded-b-lg">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ID</td>
                                <td className="px-4 py-2">TÊN NHÂN VIÊN</td>
                                <td className="px-4 py-2">NHÀ CUNG CẤP</td>
                                <td className="px-4 py-2">GIÁ</td>
                                <td className="px-4 py-2">NGÀY THÊM</td>
                                <td className="px-4 py-2 text-right">ACTION</td>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                            {importData?.length &&
                                importData.map((item, index: number) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">
                                                {item.id}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.employee}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">
                                                {item.supplier}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.totalAmount}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {handleDate(item.createdAt)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-end text-right">
                                                <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                                    <CiEdit size={22} />
                                                </button>
                                                <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
                                                    <AiOutlineDelete
                                                        size={22}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {allImports && paging && (
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
                <Notification />
            </div>
            {isNewImport ? (
                <CenterModal
                    show={isNewImport}
                    setShow={setisNewImport}
                    mainContent={<div className="flex flex-col gap-6"></div>}
                />
            ) : null}
        </div>
    );
};

export default Imports;
