import { AiOutlinePrinter } from "react-icons/ai"
import { LiaSearchPlusSolid } from "react-icons/lia"
import DropDownDateRange from "./DropDownDateRange"

const RecentOrders = () => {
    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Recent Order
                </h1>
                <div>
                    <DropDownDateRange />
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2 mb-2"></div>
            <div className="overflow-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">ORDER ID</td>
                            <td className="px-4 py-2">ORDER DATE</td>
                            <td className="px-4 py-2">CUSTOMER</td>
                            <td className="px-4 py-2">AMOUNT</td>
                            <td className="px-4 py-2">STATUS</td>
                            <td className="px-4 py-2 text-right">INVOICE</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-400">
                        {
                            [0, 0, 0, 0, 0, 0, 0].map((_, idx) =>
                            (<tr className="bg-custom-addmin_bg" key={idx}>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold uppercase">
                                        #10492
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">
                                        Oct 31, 2023 7:58 PM
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full overflow-hidden h-7 w-7">
                                            <img src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg" />
                                        </div>
                                        <div className="text-sm">Alex Smith</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">
                                        $27.07
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="font-serif">
                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                                            Pending
                                        </span>
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-end">
                                        <div className="flex justify-between items-center gap-2">
                                            <button>
                                                <AiOutlinePrinter size={22} />
                                            </button>
                                            <button>
                                                <LiaSearchPlusSolid size={22} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>)
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentOrders