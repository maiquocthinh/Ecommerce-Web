import React, { useState } from "react";
import { BiTable, BiUserPin } from "react-icons/Bi";
import { FaHouseUser, FaJediOrder } from "react-icons/fa";
import { FiSettings, FiUsers, FiLogOut } from "react-icons/Fi";
import {
    MdOutlineExpandMore,
    MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type taskType = {
    id: string | number;
    Icon: React.ReactNode;
    label: string;
    link?: string;
    more?: React.ReactNode;
    listMore?: { id: string | number; link: string; label: string }[];
};
const AdminSidebar = () => {
    const [active, setActive] = useState<number | string>(1);
    const [showMore, setShowMore] = useState<number | string>("");
    const router = useNavigate();
    const adminRole = useSelector((state: any) => state.adminRole.data);
    const listTask: taskType[] = [
        {
            id: 1,
            Icon: <RxDashboard size={22} />,
            label: "Dashboard",
            link: "/admin/dashboard",
        },
        {
            id: 7,
            Icon: <FaHouseUser size={22} />,
            label: "Empoyees",
            link: "/admin/employees",
        },
        {
            id: 6,
            Icon: <MdOutlineProductionQuantityLimits size={22} />,
            label: "products management",
            link: "/admin/products",
        },
        {
            id: 2,
            Icon: <BiTable size={22} />,
            label: "Catalog",
            more: <MdOutlineExpandMore size={22} />,
            listMore: [
                {
                    id: 1,
                    link: "/admin/catalog/categories",
                    label: "categories",
                },
                {
                    id: 2,
                    link: "/admin/catalog/brands",
                    label: "brands",
                },
                {
                    id: 3,
                    link: "/admin/catalog/needs",
                    label: "needs",
                },
            ],
        },
        {
            id: 3,
            Icon: <FiUsers size={22} />,
            label: "role management",
            link: "/admin/role",
        },
        {
            id: 4,
            Icon: <FaJediOrder size={22} />,
            label: "orders",
            link: "/admin/orders",
        },
        {
            id: 5,
            Icon: <BiUserPin size={22} />,
            label: "our Staff",
            link: "/admin/staff",
        },
        {
            id: 9,
            Icon: <BiUserPin size={22} />,
            label: "supplier",
            link: "/admin/supplier",
        },
        {
            id: 8,
            Icon: <FiSettings size={22} />,
            label: "Settings",
            link: "/admin/setting",
        },
    ];
    const handleTask = (task: taskType) => {
        setActive(task.id);
        setShowMore("");
        if (task.link) router(task.link);
    };
    const handleShowMore = (task: taskType) => {
        setActive(task.id);
        if (showMore === "") {
            setShowMore(task.id);
        } else {
            setShowMore("");
        }
    };
    return (
        <div className="col-span-2 overflow-hidden left-0-0 top-0 bottom-0 p-4 bg-custom-admin_bg_content h-full text-custom-addmin_color">
            <div className="fixed w-56 flex flex-col justify-between h-full">
                <div className="flex-1 ">
                    <div className="h-[64px] flex items-center justify-start">
                        <img
                            src="https://dashtar-admin.vercel.app/@/assets/logo-dark-a4d6f179.svg"
                            alt="logo"
                            className="h-[32px] object-contain ml-2"
                        />
                    </div>
                    <div className="mt-6 w-full flex flex-col gap-4 text-[14px] font-medium">
                        {listTask.map((task) => {
                            if (!task.more) {
                                return (
                                    <div key={task.id}>
                                        <div
                                            onClick={() => handleTask(task)}
                                            className={`flex gap-2 p-2  items-center cursor-pointer  transition-all duration-200 ${
                                                active === task.id
                                                    ? "text-custom-addmin_Active__color"
                                                    : "hover:text-white"
                                            }`}
                                        >
                                            {task.Icon}
                                            <span>{task.label}</span>
                                        </div>
                                    </div>
                                );
                            } else if (task.more && task.listMore) {
                                return (
                                    <div
                                        key={task.id}
                                        className="flex flex-col gap-2"
                                    >
                                        <div>
                                            <div
                                                onClick={() =>
                                                    handleShowMore(task)
                                                }
                                                key={task.id}
                                                className={`flex gap-2 p-2  items-center cursor-pointer  transition-all duration-200 ${
                                                    active === task.id
                                                        ? "text-custom-addmin_Active__color"
                                                        : "hover:text-white"
                                                }`}
                                            >
                                                {task.Icon}
                                                <span>{task.label}</span>
                                                {task.more}
                                            </div>
                                        </div>
                                        {showMore === task.id && (
                                            <div
                                                className={`flex flex-col gap-2 bg-custom-addmin_bg p-2 rounded-md text-lg text-[#6b7280] transition-all ease-in-out duration-200 ${
                                                    active === task.id
                                                        ? "text-custom-addmin_Active__color"
                                                        : "hover:text-white"
                                                }`}
                                            >
                                                {task.listMore.map((item) => (
                                                    <span
                                                        key={item.id}
                                                        className="hover:text-white cursor-pointer"
                                                        onClick={() =>
                                                            router(item.link)
                                                        }
                                                    >
                                                        - {item.label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            } else return null;
                        })}
                    </div>
                </div>
                <div className="flex items-center  gap-3 justify-center w-full cursor-pointer text-center bg-[#0ea573] hover:bg-custom-addmin_Active__color rounded-lg py-3 text-white text-sm font-normal mb-8">
                    <FiLogOut />
                    <button className="border-none">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
