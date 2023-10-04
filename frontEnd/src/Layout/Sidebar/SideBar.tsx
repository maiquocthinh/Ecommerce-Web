import { FaMobile } from "@react-icons/all-files/fa/faMobile";
import { FaTablet } from "@react-icons/all-files/fa/FaTablet";
import { FaLaptop } from "@react-icons/all-files/fa/FaLaptop";
import { FaHeadphones } from "@react-icons/all-files/fa/FaHeadphones";
import { FaUsb } from "@react-icons/all-files/fa/FaUsb";
import { FaDesktop } from "@react-icons/all-files/fa/FaDesktop";
import { FaVolumeUp } from "@react-icons/all-files/fa/FaVolumeUp";
import { FaNewspaper } from "@react-icons/all-files/fa/FaNewspaper";
import SideBarItem from "./sideBarItem";
interface SideBarProps {
}
const SlideBar: React.FC<SideBarProps> = ({ }) => {
    const data = [
        {
            icon: <FaMobile />,
            title: "Điện thoại",
            link: "mobile"
        },
        {
            icon: <FaTablet />,
            title: "Tablet",
            link: "tablet"
        },
        {
            icon: <FaLaptop />,
            title: "Laptop",
            link: "laptop"
        },
        {
            icon: <FaHeadphones />,
            title: "Âm thanh",
            link: "sounds"
        },
        {
            icon: <FaUsb />,
            title: "phụ kiện",
            link: "accessory"
        },
        {
            icon: <FaDesktop />,
            title: "PC",
            link: "PC"
        },
        {
            icon: <FaVolumeUp />,
            title: "Khuyến mãi",
            link: "sale"
        },
        {
            icon: <FaNewspaper />,
            title: "Tin công nghệ",
            link: "newspaper"
        },
    ]
    return (
        <div className="shadow-custom w-full rounded-borderContnet">
            {data?.length > 0 && data.map((item, index) => (
                <SideBarItem data={item} key={index} />
            ))}
        </div>
    );
}

export default SlideBar;