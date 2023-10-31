import { GoStack } from "react-icons/go"
import { BsCart4, BsCreditCard, BsArrowRepeat, BsCheckCircle } from "react-icons/bs"
import { CiDiscount1 } from "react-icons/ci"
import { AiOutlinePrinter } from "react-icons/ai"
import { LiaSearchPlusSolid } from "react-icons/lia"
import { MdOutlineLocalShipping } from "react-icons/md"
import { FcNext, FcPrevious } from "react-icons/fc"
import Graph from "./Graph/Graph";
type OverviewType = {
    id: string | number;
    Icon: React.ReactNode;
    bg: string,
    title: string,
    price: string,
    monyType?: {}[]
};
const OverviewList: OverviewType[] = [
    {
        id: 1,
        bg: "#0d9488",
        Icon: <GoStack />,
        title: "Today Orders",
        price: "$245.67",
        monyType: [
            {
                Cash: "$245.67"
            },
            {
                Card: "$0"
            },
            {
                Credit: "$0"
            },
        ]
    },
    {
        id: 2,
        bg: "#fb923c",
        Icon: <GoStack />,
        title: "Yesterday Orders",
        price: "$127.07",
        monyType: [
            {
                Cash: "$127.07"
            },
            {
                Card: "$0"
            },
            {
                Credit: "$0"
            },
        ]
    },
    {
        id: 3,
        bg: "#3b82f6",
        Icon: <BsCart4 />,
        title: "This Month",
        price: "$151797.48",
    },
    {
        id: 4,
        bg: "#0891b2",
        Icon: <BsCreditCard />,
        title: "Last Month",
        price: "$37324.16",
    },
    {
        id: 5,
        bg: "#059669",
        Icon: <CiDiscount1 />,
        title: "All-Time Sales",
        price: "$430864.75",
    }
]
const orderList = [
    {
        id: 1,
        Icon: <BsCart4 />,
        label: "Total Order",
        number: 0,
        bg: "#f97316"
    },
    {
        id: 2,
        label: "Orders Pending 0",
        Icon: <BsArrowRepeat />,
        number: 0,
        bg: "#3b82f6"
    },
    {
        id: 3,
        label: "Orders Processing",
        Icon: <MdOutlineLocalShipping />,
        number: 0,
        bg: "#14b8a6"
    },
    {
        id: 4,
        label: "Orders Delivered",
        Icon: <BsCheckCircle />,
        number: 0,
        bg: "#10b981"
    }
]
const Dashboard = () => {
    return (
        <div className="h-full w-full flex flex-col gap-3 p-4 text-gray-300 font-bold text-lg">
            <div className="flex flex-col gap-6">
                <h1>Dashboard Overview</h1>
                <div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2">
                    {OverviewList.map(OverviewItem =>
                        <div key={OverviewItem.id} className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
                            <div className="border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-emerald-100 bg-teal-600" style={{ backgroundColor: OverviewItem.bg }}>
                                <div className="text-center xl:mb-0 mb-3">
                                    <div className="text-center inline-block text-3xl text-white dark:text-emerald-100 bg-teal-600" style={{ backgroundColor: OverviewItem.bg }}>
                                        {OverviewItem.Icon}
                                    </div>
                                    <div>
                                        <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">{OverviewItem.title}</p>
                                        <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">{OverviewItem.price}</p>
                                    </div>
                                    {OverviewItem?.monyType &&
                                        <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
                                            {OverviewItem.monyType.map((item: any) =>
                                            (
                                                <div className="px-1 mt-3">
                                                    {Object.keys(item).map((key) => (
                                                        <div key={key}>
                                                            {key}: {item[key]}
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                            )}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {orderList.map(order =>
                        <div key={order.id} className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-full">
                            <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
                                <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500" style={{ backgroundColor: order.bg }}>
                                    {order.Icon}
                                </div>
                                <div>
                                    <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
                                        <span>{order.label}</span>
                                    </h6>
                                    <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">{order.number}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Graph />
                <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300" >
                    Recent Order
                </h1>
                <div>
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">INVOICE NO</td>
                                <td className="px-4 py-2">ORDER TIME</td>
                                <td className="px-4 py-2">Customer Name </td>
                                <td className="px-4 py-2"> METHOD </td>
                                <td className="px-4 py-2"> AMOUNT </td>
                                <td className="px-4 py-2">STATUS</td>
                                <td className="px-4 py-2">ACTION</td>
                                <td className="px-4 py-2 text-right">INVOICE</td>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                            <tr className="bg-custom-addmin_bg">
                                <td className="px-4 py-2">
                                    <span className="font-semibold uppercase text-xs">10492</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">Oct 31, 2023  7:58 PM</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="text-sm">Vikasdh oSdhfuisdhf</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">Cash</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">$27.07</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="font-serif">
                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <select className="block w-full border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5 h-8"><option value="status">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
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
                            </tr>
                            <tr className="bg-custom-addmin_bg">
                                <td className="px-4 py-2">
                                    <span className="font-semibold uppercase text-xs">10492</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">Oct 31, 2023  7:58 PM</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="text-sm">Vikasdh oSdhfuisdhf</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">Cash</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">$27.07</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="font-serif">
                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <select className="block w-full border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5 h-8"><option value="status">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
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
                            </tr>
                            <tr className="bg-custom-addmin_bg">
                                <td className="px-4 py-2">
                                    <span className="font-semibold uppercase text-xs">10492</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">Oct 31, 2023  7:58 PM</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="text-sm">Vikasdh oSdhfuisdhf</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">Cash</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">$27.07</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="font-serif">
                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <select className="block w-full border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5 h-8"><option value="status">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
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
                            </tr>
                            <tr className="bg-custom-addmin_bg">
                                <td className="px-4 py-2">
                                    <span className="font-semibold uppercase text-xs">10492</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">Oct 31, 2023  7:58 PM</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="text-sm">Vikasdh oSdhfuisdhf</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">Cash</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">$27.07</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="font-serif">
                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <select className="block w-full border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5 h-8"><option value="status">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
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
                            </tr>
                        </tbody>
                    </table>
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
                        <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
                            <span className="flex items-center font-semibold tracking-wide uppercase">Showing 1-8 of 491</span>
                            <div className="flex mt-2 sm:mt-auto sm:justify-end">
                                <nav aria-label="Table navigation">
                                    <ul className="inline-flex items-center text-[12px] text-[#9ca3af]">
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer" type="button" aria-label="Previous">
                                                <FcPrevious />
                                            </button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer" type="button" aria-label="Previous">
                                                1
                                            </button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer" type="button" aria-label="Previous">
                                                2
                                            </button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer" type="button" aria-label="Previous">
                                                3
                                            </button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer" type="button" aria-label="Previous">
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
        </div >
    );
}

export default Dashboard;