import { AiOutlinePrinter } from "react-icons/ai";
import { BsCloudArrowDown } from "react-icons/bs";
import { FcNext, FcPrevious } from "react-icons/fc";
import { LiaSearchPlusSolid } from "react-icons/lia";
const Orders = () => {
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
                Orders
            </h1>
            <div className="rounded-lg  min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <form>
                        <div className="grid gap-4 lg:gap-4 xl:gap-6 md:gap-2 md:grid-cols-5 py-2">
                            <div>
                                <input
                                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                    type="search"
                                    name="search"
                                    placeholder="Search by Customer Name"
                                />
                            </div>
                            <div>
                                <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                    <option value="Status">Status</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">
                                        Processing
                                    </option>
                                    <option value="Cancel">Cancel</option>
                                </select>
                            </div>
                            <div>
                                <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                    <option value="Order limits">
                                        Order limits
                                    </option>
                                    <option value="5">
                                        Last 5 days orders
                                    </option>
                                    <option value="7">
                                        Last 7 days orders
                                    </option>
                                    <option value="15">
                                        Last 15 days orders
                                    </option>
                                    <option value="30">
                                        Last 30 days orders
                                    </option>
                                </select>
                            </div>
                            <div>
                                <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                    <option value="Method">Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="Credit">Credit</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="false flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600"
                                >
                                    Download All Orders
                                    <span className="ml-2 text-base">
                                        <BsCloudArrowDown size={22} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
                            <div>
                                <label className="block text-sm text-gray-800 dark:text-gray-400">
                                    Start Date
                                </label>
                                <input
                                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                    type="date"
                                    name="startDate"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-800 dark:text-gray-400">
                                    End Date
                                </label>
                                <input
                                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                    type="date"
                                    name="startDate"
                                />
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <div className="w-full mx-1">
                                    <label className="block text-sm text-gray-800 dark:text-gray-400">
                                        Filter
                                    </label>
                                    <button
                                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                        type="submit"
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
                                        type="reset"
                                    >
                                        <span className="text-black dark:text-gray-200">
                                            Reset
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">INVOICE NO</td>
                            <td className="px-4 py-2">ORDER TIME</td>
                            <td className="px-4 py-2">Customer Name</td>
                            <td className="px-4 py-2">METHOD</td>
                            <td className="px-4 py-2">AMOUNT</td>
                            <td className="px-4 py-2">STATUS</td>
                            <td className="px-4 py-2">ACTION</td>
                            <td className="px-4 py-2 text-right">INVOICE</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    10493
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    Nov 1, 2023 2:52 AM
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="text-sm">gjh nbn</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    Card
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $132.72
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="font-serif">
                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                                        Pending
                                    </span>
                                </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                    <option value="status">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">
                                        Processing
                                    </option>
                                    <option value="Cancel">Cancel</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 text-right flex justify-end">
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
                                    >
                                        <p
                                            data-tip="true"
                                            data-for="receipt"
                                            className="text-xl"
                                        >
                                            <AiOutlinePrinter size={22} />
                                        </p>
                                    </button>
                                    <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                                        <a href="/order/65415b0fb128d800087cd876">
                                            <p
                                                data-tip="true"
                                                data-for="view"
                                                className="text-xl"
                                            >
                                                <LiaSearchPlusSolid size={22} />
                                            </p>
                                        </a>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    10493
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    Nov 1, 2023 2:52 AM
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="text-sm">gjh nbn</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    Card
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $132.72
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="font-serif">
                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                                        Pending
                                    </span>
                                </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                    <option value="status">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">
                                        Processing
                                    </option>
                                    <option value="Cancel">Cancel</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 text-right flex justify-end">
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
                                    >
                                        <p
                                            data-tip="true"
                                            data-for="receipt"
                                            className="text-xl"
                                        >
                                            <AiOutlinePrinter size={22} />
                                        </p>
                                    </button>
                                    <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                                        <a href="/order/65415b0fb128d800087cd876">
                                            <p
                                                data-tip="true"
                                                data-for="view"
                                                className="text-xl"
                                            >
                                                <LiaSearchPlusSolid size={22} />
                                            </p>
                                        </a>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    10493
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    Nov 1, 2023 2:52 AM
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="text-sm">gjh nbn</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    Card
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $132.72
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="font-serif">
                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                                        Pending
                                    </span>
                                </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                    <option value="status">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">
                                        Processing
                                    </option>
                                    <option value="Cancel">Cancel</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 text-right flex justify-end">
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
                                    >
                                        <p
                                            data-tip="true"
                                            data-for="receipt"
                                            className="text-xl"
                                        >
                                            <AiOutlinePrinter size={22} />
                                        </p>
                                    </button>
                                    <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                                        <a href="/order/65415b0fb128d800087cd876">
                                            <p
                                                data-tip="true"
                                                data-for="view"
                                                className="text-xl"
                                            >
                                                <LiaSearchPlusSolid size={22} />
                                            </p>
                                        </a>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    10493
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    Nov 1, 2023 2:52 AM
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="text-sm">gjh nbn</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    Card
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $132.72
                                </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                                <span className="font-serif">
                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                                        Pending
                                    </span>
                                </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                    <option value="status">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">
                                        Processing
                                    </option>
                                    <option value="Cancel">Cancel</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 text-right flex justify-end">
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
                                    >
                                        <p
                                            data-tip="true"
                                            data-for="receipt"
                                            className="text-xl"
                                        >
                                            <AiOutlinePrinter size={22} />
                                        </p>
                                    </button>
                                    <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                                        <a href="/order/65415b0fb128d800087cd876">
                                            <p
                                                data-tip="true"
                                                data-for="view"
                                                className="text-xl"
                                            >
                                                <LiaSearchPlusSolid size={22} />
                                            </p>
                                        </a>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
                    <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
                        <span className="flex items-center font-semibold tracking-wide uppercase">
                            Showing 1-8 of 491
                        </span>
                        <div className="flex mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center text-[12px] text-[#9ca3af]">
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400  border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            <FcPrevious />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            1
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium  p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            2
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            3
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium  p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            <FcNext />
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
