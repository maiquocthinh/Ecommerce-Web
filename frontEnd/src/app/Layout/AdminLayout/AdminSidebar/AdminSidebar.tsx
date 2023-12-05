import { AdminLogout } from "@/app/action/adminAction/adminEmployees";
import Notification from "@/Components/PageLoader/Notification";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BiTable, BiUserPin } from "react-icons/Bi";
import {
    FaHouseUser,
    FaJediOrder,
    FaSupple,
    FaUserAstronaut,
} from "react-icons/fa";
import { FcCustomerSupport } from "react-icons/fc";
import { FiSettings, FiUsers, FiLogOut } from "react-icons/Fi";
import {
    MdOutlineExpandMore,
    MdOutlineProductionQuantityLimits,
    MdOutlineReviews,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
type taskType = {
    id: string | number;
    Icon: React.ReactNode;
    label: string;
    link?: string;
    more?: React.ReactNode;
    listMore?: { id: string | number; link: string; label: string }[];
};
const AdminSidebar = () => {
    const dispatch = useDispatch<any>();
    const currentPathname = window.location.pathname;
    const [active, setActive] = useState<string>(currentPathname);
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
            id: 2,
            Icon: <FaHouseUser size={22} />,
            label: "Emlpoyees management",
            link: "/admin/employees",
        },
        {
            id: 3,
            Icon: <MdOutlineProductionQuantityLimits size={22} />,
            label: "products management",
            more: <MdOutlineExpandMore size={22} />,
            listMore: [
                {
                    id: 11,
                    link: "/admin/products-manages/products",
                    label: "products",
                },
                {
                    id: 12,
                    link: "/admin/products-manages/discounts",
                    label: "discounts",
                },
                {
                    id: 13,
                    link: "/admin/products-manages/inventories",
                    label: "inventories",
                },
                {
                    id: 14,
                    link: "/admin/products-manages/imports",
                    label: "imports",
                },
            ],
        },
        {
            id: 4,
            Icon: <BiTable size={22} />,
            label: "Catalog",
            more: <MdOutlineExpandMore size={22} />,
            listMore: [
                {
                    id: 5,
                    link: "/admin/catalog/categories",
                    label: "categories",
                },
                {
                    id: 6,
                    link: "/admin/catalog/brands",
                    label: "brands",
                },
                {
                    id: 7,
                    link: "/admin/catalog/needs",
                    label: "needs",
                },
            ],
        },
        {
            id: 8,
            Icon: <FiUsers size={22} />,
            label: "role management",
            link: "/admin/role",
        },
        {
            id: 9,
            Icon: <BiUserPin size={22} />,
            label: "orders management",
            link: "/admin/orders",
        },
        {
            id: 10,
            Icon: <FaSupple size={22} />,
            label: "supplier management",
            link: "/admin/supplier",
        },
        {
            id: 15,
            Icon: <FaUserAstronaut size={22} />,
            link: "/admin/customer",
            label: "customer management",
        },
        {
            id: 16,
            Icon: <MdOutlineReviews size={22} />,
            link: "/admin/reviews",
            label: "review management",
        },
    ];
    useEffect(() => {
        setActive(currentPathname);
    }, [currentPathname]);
    const handleTask = (task: taskType) => {
        setShowMore("");
        if (task.link) router(task.link);
    };
    const handleShowMore = (task: taskType) => {
        if (showMore === "") {
            setShowMore(task.id);
        } else {
            setShowMore("");
        }
    };
    const handleLogout = async () => {
        const refreshTokenAdmin = Cookies.get("refreshTokenAdmin") as string;
        if (refreshTokenAdmin) {
            const res = await dispatch(AdminLogout(refreshTokenAdmin));
            try {
                if (res.payload.success) {
                    toast.success("đăng xuất thành công");
                    Cookies.remove("refreshTokenExpiredInAdmin");
                    Cookies.remove("refreshTokenAdmin");
                    Cookies.remove("accessTokenExpiredInAdmin");
                    Cookies.remove("AdminToken");
                    localStorage.clear();
                    router("/");
                } else {
                    toast.error("đăng xuất thất bại");
                }
            } catch (error) {
                toast.error("lỗi hệ thông vui lòng thử lại");
            }
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
                                                active ===
                                                (task.listMore
                                                    ? task.listMore[0]
                                                    : task.link)
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
                                        className={`flex flex-col gap-2`}
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
                                                className={`flex flex-col gap-2 bg-custom-addmin_bg p-2 rounded-md text-lg text-[#6b7280] transition-all ease-in-out duration-200`}
                                            >
                                                {task.listMore.map((item) => (
                                                    <span
                                                        key={item.id}
                                                        className={`hover:text-white cursor-pointer ${
                                                            active === item.link
                                                                ? "text-custom-addmin_Active__color"
                                                                : "hover:text-white"
                                                        }`}
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
                    <button
                        onClick={handleLogout}
                        className="border-none flex items-center gap-2"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </div>
            <Notification />
        </div>
    );
};

export default AdminSidebar;
