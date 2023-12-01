import Notification from "@/Components/PageLoader/Notification";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit, CiExport } from "react-icons/ci";
const Inventories = () => {
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex items-center">
                        <div className="lg:flex md:flex flex-grow-0">
                            <button className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none">
                                <CiExport size={22} />
                                <span className="text-xs">Tạo mới</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg mb-8 rounded-b-lg">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ID</td>
                                <td className="px-4 py-2">NAME</td>
                                <td className="px-4 py-2">IMAGE</td>
                                <td className="px-4 py-2">COLOR</td>
                                <td className="px-4 py-2">PRICE</td>
                                <td className="px-4 py-2">SPECIFICATION</td>
                                <td className="px-4 py-2 text-right">ACTION</td>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                            <tr>
                                <td className="px-4 py-2">
                                    <span className="text-sm">fdfsd</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">
                                        fdsf
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <img
                                        src={""}
                                        alt=""
                                        className="h-14 object-contain"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">
                                        fds
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">
                                        fsdf
                                    </span>
                                </td>
                                <td className="px-4 py-2">fsdf</td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-end text-right">
                                        <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                            <CiEdit size={22} />
                                        </button>
                                        <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Notification />
            </div>
        </div>
    );
};

export default Inventories;
