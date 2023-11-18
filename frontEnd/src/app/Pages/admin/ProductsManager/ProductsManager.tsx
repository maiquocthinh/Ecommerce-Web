import { BiBookBookmark } from "react-icons/Bi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { FcNext, FcPrevious } from "react-icons/fc";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { adminAllProduct } from "@/app/action/adminAction/adminProduct";
import Paginations from "@/Components/Paginations/Paginations";
import { pagingType } from "@/common/paging";
import { AdminProductType } from "@/common/adminType/AdminProduct";
const ProductsManager = () => {
    const dispatch = useDispatch<any>();
    const adminAllProductData = useSelector(
        (state: any) =>
            state.adminAllProduct.data as {
                data: { list: AdminProductType[]; paging: pagingType };
            }
    );
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPage: 1,
        pageSize: 2,
    });
    const [allProduct, setAllProduct] = useState<AdminProductType[]>([]);
    const [zoomImg, setZoomImg] = useState<string>("");
    useEffect(() => {
        dispatch(adminAllProduct({ pageSize: 2, pageIndex: 1 }));
    }, [dispatch]);
    useEffect(() => {
        if (adminAllProductData && adminAllProductData?.data?.paging) {
            setPagination({
                currentPage: adminAllProductData.data.paging.pageIndex || 1,
                totalPage: adminAllProductData.data.paging.totalPages || 1,
                pageSize: adminAllProductData.data.paging.pageSize || 1,
            });
        }
        if (adminAllProductData?.data?.list) {
            setAllProduct(adminAllProductData?.data?.list);
        }
    }, [adminAllProductData]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            dispatch(adminAllProduct({ pageSize: 2, pageIndex: newPage }));
        }
    };
    const handleZoomImg = (img: string) => {
        if (zoomImg === "") {
            setZoomImg(img);
        } else {
            setZoomImg("");
        }
    };
    useEffect(() => {
        if (zoomImg) {
            const checkImg = setTimeout(() => {
                setZoomImg("");
            }, 2000);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            () => clearTimeout(checkImg);
        }
    }, [zoomImg]);
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
                ProductsManager
            </h1>
            <div className="rounded-lg shadow-xs  dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                        <div className="items-center">
                            <div className="lg:flex md:flex flex-grow-0">
                                <div className="flex">
                                    <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                                        <button className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none">
                                            <CiExport size={22} />
                                            <span className="text-xs">
                                                Export
                                            </span>
                                        </button>
                                    </div>
                                    <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                                        <button className="border flex gap-1 justify-center items-center h-10 w-20 hover:text-yellow-400 border-gray-300 dark:text-gray-300 cursor-pointer py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                                            <CiImport size={22} />
                                            <span className="text-xs">
                                                Import
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg shadow-xs  dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <input
                                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                type="search"
                                name="search"
                                placeholder="Search by name/email/phone"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 mt-5 mr-1"
                            ></button>
                        </div>
                        <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <div className="w-full mx-1">
                                <button
                                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                    type="submit"
                                >
                                    Filter
                                </button>
                            </div>
                            <div className="w-full mx-1">
                                <button
                                    className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-600  dark:text-gray-400 focus:outline-none rounded-lg border bg-gray-200 border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm dark:bg-gray-700"
                                    type="reset"
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
            <div style={{ overflowY: "auto" }}>
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">ID</td>
                            <td className="px-4 py-2">NAME</td>
                            <td className="px-4 py-2">IMAGE</td>
                            <td className="px-4 py-2">DESCRIPTION</td>
                            <td className="px-4 py-2">REVIEWSCORE</td>
                            <td className="px-4 py-2">CATALOGS</td>
                            <td className="px-4 py-2">WARRANTY</td>
                            <td className="px-4 py-2 text-right">ACTION</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                        {allProduct?.length > 0 &&
                            allProduct.map((product) => (
                                <tr
                                    className="bg-custom-addmin_bg"
                                    key={product.id}
                                >
                                    <td className="px-4 py-2 ">
                                        <span className="font-semibold uppercase text-xs">
                                            {product.id}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">
                                            {product.name}
                                        </span>
                                    </td>
                                    <td
                                        className={`px-4 py-2 cursor-pointer ${
                                            zoomImg === product.imageUrl
                                                ? "fixed top-0 left-0 w-full h-full bg-slate-950 flex justify-center items-center z-30"
                                                : null
                                        }`}
                                        onClick={() =>
                                            handleZoomImg(product.imageUrl)
                                        }
                                    >
                                        <img
                                            src={product.imageUrl}
                                            alt=""
                                            className={`w-[30px] h-[30px] object-contain ${
                                                zoomImg ? "w-full h-full" : null
                                            }`}
                                        />
                                    </td>
                                    <td
                                        className="px-4 py-2"
                                        style={{
                                            maxWidth: "200px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        <span className="text-sm">
                                            {product.description}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <span className="text-sm">
                                            {product.reviewsScore}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <span className="text-sm">
                                            {`categoryId :${
                                                product.categoryId || 0
                                            } -brandId :${
                                                product.brandId || 0
                                            }`}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <span className="text-sm">
                                            {product.warranty}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <div className="flex justify-end">
                                            <div className="flex justify-between items-center gap-2">
                                                <button>
                                                    <BiBookBookmark size={22} />
                                                </button>
                                                <button>
                                                    <LiaSearchPlusSolid
                                                        size={22}
                                                    />
                                                </button>
                                                <button>
                                                    <AiOutlineDelete
                                                        size={22}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {pagination && adminAllProductData?.data?.paging && (
                    <Paginations
                        handlePageChange={handlePageChange}
                        pagination={pagination}
                        paging={adminAllProductData.data.paging}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductsManager;
