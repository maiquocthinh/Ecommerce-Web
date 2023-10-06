import SidebarItem from "./sidebarItem";
import Logo from "./logo";
import { FaHouseDamage } from "@react-icons/all-files/fa/FaHouseDamage";
import { FaHistory } from "@react-icons/all-files/fa/FaHistory";
import { FaGifts } from "@react-icons/all-files/fa/FaGifts";
import { FaMedal } from "@react-icons/all-files/fa/FaMedal";
import { FaShieldAlt } from "@react-icons/all-files/fa/FaShieldAlt";
import { BsGear } from "@react-icons/all-files/bs/BsGear";
import { FaArrowCircleRight } from "@react-icons/all-files/fa/FaArrowCircleRight";

const SideBarProfile = () => {
    const Greneral = [
        {
            icon: <FaHouseDamage />,
            title: "Trang chủ"
        },
        {
            icon: <FaHistory />,
            title: "Lịch sử mua hàng"
        },
        {
            icon: <FaGifts />,
            title: "Ưu đãi của bạn"
        },
        {
            icon: <FaMedal />,
            title: "Hạng thành viên"
        }, {
            icon: <FaShieldAlt />,
            title: "Bảo hành"
        }
    ]
    const Others = [
        {
            icon: <BsGear />,
            title: "cài đặt"
        },
        {
            icon: <FaArrowCircleRight />,
            title: "Đăng xuất"
        },
    ]
    return (
        <div className="fixed flex flex-col gap-1 w-max">
            <Logo />
            <div>
                <h1 className="px-2">Greneral</h1>
                <div className="flex gap-3 flex-col border-b">
                    {Greneral?.length > 0 && Greneral.map((item, index) => (
                        <SidebarItem title={item.title} icon={item.icon} key={index} />
                    ))}
                </div>
            </div>
            <div>
                <h1 className="px-2">Others</h1>
                <div className="flex gap-3 flex-col">
                    {Others?.length > 0 && Others.map((item, index) => (
                        <SidebarItem title={item.title} icon={item.icon} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideBarProfile;