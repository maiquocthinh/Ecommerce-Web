import Notification from "@/Components/PageLoader/Notification";
import { AiOutlineTags } from "react-icons/ai";
import { BsBoxSeamFill, BsCart4, BsFillPostageHeartFill, BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineCategory, MdOutlineLocalShipping } from "react-icons/md";
import { GiMoneyStack, GiProfit } from "react-icons/gi";
import { HiMiniUserGroup, HiOutlineArrowDownRight, HiOutlineArrowUpRight } from "react-icons/hi2";

import RecentOrders from "./Components/RecentOrders";
import CatalogSellingPercent from "./Components/CatalogSellingPercent";
import BestSellingProducts from "./Components/BestSellingProducts";
import TopSellingEmployees from "./Components/TopSellingEmployees";
import OverviewChart from "./Components/OverviewChart";

type OverviewDataType = {
    thisWeek: OverviewType[],
    total: any[],
}
type OverviewType = {
    id: string | number;
    Icon: React.ReactNode;
    bg: string;
    title: string;
    value: string;
    growthPercent?: number
};

const OverviewData: OverviewDataType = {
    thisWeek: [
        {
            id: 1,
            bg: "#0d9488",
            Icon: <GiMoneyStack />,
            title: "Revenue",
            value: "$245.67",
            growthPercent: 16.24
        },
        {
            id: 2,
            bg: "#fb923c",
            Icon: <GiProfit />,
            title: "Profit",
            value: "$127.07",
            growthPercent: 29.08
        },
        {
            id: 3,
            bg: "#3b82f6",
            Icon: <BsCart4 />,
            title: "Orders",
            value: "143",
            growthPercent: 12.64
        },
        {
            id: 4,
            bg: "#0891b2",
            Icon: <HiMiniUserGroup />,
            title: "Customers",
            value: "342",
            growthPercent: -9.32
        },
    ],
    total: [
        {
            id: 1,
            Icon: <HiMiniUserGroup />,
            label: "Customers",
            value: 435,
            bg: "#f97316",
        },
        {
            id: 2,
            label: "Emplyees",
            Icon: <BsPersonWorkspace />,
            value: 45,
            bg: "#3b82f6",
        },
        {
            id: 3,
            label: "Orders",
            Icon: <BsCart4 />,
            value: 678,
            bg: "#14b8a6",
        },
        {
            id: 4,
            label: "Products",
            Icon: <BsBoxSeamFill />,
            value: 32,
            bg: "#10b981",
        },
        {
            id: 5,
            label: "Suppliers",
            Icon: <MdOutlineLocalShipping />,
            value: 32,
            bg: "#3258d3",
        },
        {
            id: 6,
            label: "Brands",
            Icon: <AiOutlineTags />,
            value: 12,
            bg: "#ff6767",
        },
        {
            id: 7,
            label: "Categories",
            Icon: <MdOutlineCategory />,
            value: 2,
            bg: "#10b981",
        },
        {
            id: 8,
            label: "Needs",
            Icon: <BsFillPostageHeartFill />,
            value: 6,
            bg: "#f9c200",
        },
    ]
}
const Dashboard = () => {
    return (
        <div className="h-full w-full flex flex-col gap-3 p-4 text-gray-600 font-bold text-lg">
            <div className="flex flex-col gap-6">
                <h1>Dashboard Overview</h1>

                <div className="grid gap-2 mb-8 xl:grid-cols-4 md:grid-cols-2">
                    {OverviewData.thisWeek.map((OverviewItem) => (
                        <div
                            key={OverviewItem.id}
                            className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full"
                        >
                            <div
                                className="border border-gray-200 justify-between dark:border-gray-800 w-full px-3 py-6 rounded-lg text-white dark:text-emerald-100 bg-teal-600"
                                style={{ backgroundColor: OverviewItem.bg }}
                            >
                                <div className="flex gap-2 justify-between xl:mb-0 mb-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="text-center inline-block text-5xl text-white dark:text-emerald-100 bg-teal-600"
                                            style={{
                                                backgroundColor: OverviewItem.bg,
                                            }}
                                        >
                                            {OverviewItem.Icon}
                                        </div>
                                        <div>
                                            <p className="mb-3 text-base font-medium text-gray-50 uppercase dark:text-gray-100">
                                                {OverviewItem.title}
                                            </p>
                                            <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                                                {OverviewItem.value}
                                            </p>
                                        </div>

                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex gap-1 items-center">
                                            {
                                                OverviewItem.growthPercent >= 0 ?
                                                    (<div>
                                                        <HiOutlineArrowUpRight />
                                                    </div>) :
                                                    (<div>
                                                        <HiOutlineArrowDownRight />
                                                    </div>)
                                            }
                                            <span>{OverviewItem.growthPercent}%</span>
                                        </div>
                                        <span className="text-xs font-normal">Since last week</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {OverviewData.total.map((order) => (
                        <div
                            key={order.id}
                            className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-full"
                        >
                            <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
                                <div
                                    className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-white dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
                                    style={{ backgroundColor: order.bg }}
                                >
                                    {order.Icon}
                                </div>
                                <div>
                                    <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
                                        <span>{order.label}</span>
                                    </h6>
                                    <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                                        {order.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <OverviewChart />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="lg:col-span-1 md:col-span-2">
                        <BestSellingProducts />
                    </div>
                    <div className="lg:col-span-1 md:col-span-2">
                        <TopSellingEmployees />
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-4">
                    <div className="lg:col-span-2 md:col-span-6">
                        <CatalogSellingPercent />
                    </div>
                    <div className="lg:col-span-4 md:col-span-6">
                        <RecentOrders />
                    </div>
                </div>


            </div>
            <Notification />
        </div>
    );
};

export default Dashboard;
