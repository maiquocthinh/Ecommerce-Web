import { BsGear } from "@react-icons/all-files/bs/BsGear";
import { useState, useEffect } from "react";
import {
    FaArrowCircleRight,
    FaGifts,
    FaHistory,
    FaHouseDamage,
    FaMedal,
    FaShieldAlt,
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Greneral = [
    {
        id: 1,
        icon: <FaHouseDamage />,
        title: "Trang chủ",
        link: "/profile/home",
    },
    {
        id: 2,
        icon: <FaHistory />,
        title: "Lịch sử mua hàng",
        link: "/profile/order",
    },
    {
        id: 3,
        icon: <FaGifts />,
        title: "Ưu đãi của bạn",
        link: "/profile/l",
    },
    {
        id: 4,
        icon: <FaMedal />,
        title: "Hạng thành viên",
        link: "/profile/l",
    },
    {
        id: 5,
        icon: <FaShieldAlt />,
        title: "Bảo hành",
        link: "/profile/h",
    },
];
const SideBarProfile = () => {
    const path = useLocation();
    const [isActive, setIsActive] = useState(path.pathname);
    const router = useNavigate();
    const handleActiveItem = (link: string) => {
        router(link);
        setIsActive(link);
    };
    useEffect(() => {
        if (isActive === path.pathname) setIsActive(path.pathname);
    }, [path, isActive]);
    return (
        <div className="fixed flex flex-col gap-1 w-max h-full">
            <div
                onClick={() => router("/")}
                className="flex gap-1 items-center border-b py-2 cursor-pointer"
            >
                <img
                    src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
                    width={100}
                    height={100}
                    alt=""
                />
                <span className="text-xl font-semibold uppercase">E-SHOP</span>
            </div>
            <div>
                <h1 className="px-2">Greneral</h1>
                <div className="flex gap-3 flex-col border-b">
                    {Greneral?.length > 0 &&
                        Greneral.map((item, index) => (
                            <div
                                onClick={() => handleActiveItem(item.link)}
                                key={index}
                                className={`p-2 gap-2 flex items-center cursor-pointer hover:text-custom-primary border-transparent text-[#4a4a4a] text-xl border hover:border-custom-primary rounded-borderContnet hover:bg-custom-primary hover:bg-opacity-[.1] ${
                                    isActive === item.link
                                        ? "text-custom-Colorprimary"
                                        : null
                                }`}
                            >
                                {item.icon}
                                <span className="text-[16px]">
                                    {item.title}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            <div>
                <h1 className="px-2">Others</h1>
                <div className="flex gap-3 flex-col">
                    <div className="p-2 gap-2 flex items-center cursor-pointer hover:text-custom-primary border-transparent text-[#4a4a4a] text-xl border hover:border-custom-primary rounded-borderContnet hover:bg-custom-primary hover:bg-opacity-[.1]">
                        <FaArrowCircleRight />
                        <span className="text-[16px]">Đăng xuất</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarProfile;
