import { BiBookBookmark } from "react-icons/Bi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { FcNext, FcPrevious } from "react-icons/fc";
import { LiaSearchPlusSolid } from "react-icons/lia";
const Customers = () => {
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
                Customers
            </h1>
            <div className="rounded-lg shadow-xs  dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
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
                    </form>
                </div>
            </div>
            <div className="rounded-lg shadow-xs  dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
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
                    </form>
                </div>
            </div>
            <div>
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">ID</td>
                            <td className="px-4 py-2">JOINING DATE</td>
                            <td className="px-4 py-2">NAME</td>
                            <td className="px-4 py-2">EMAIL</td>
                            <td className="px-4 py-2">PHONE</td>
                            <td className="px-4 py-2 text-right">ACTION</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
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

export default Customers;
