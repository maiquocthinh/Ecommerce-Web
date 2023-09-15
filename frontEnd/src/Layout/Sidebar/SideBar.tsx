import { FaPhone } from "@react-icons/all-files/fa/faPhone";
import SideBarItem from "./sideBarItem";
interface SideBarProps {
}
const SlideBar: React.FC<SideBarProps> = ({ }) => {
    const data = [
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
        {
            icon: <FaPhone />,
            title: "Điện thoại,Tablet"
        },
    ]
    return (
        <div className="shadow-custom w-full rounded-borderContnet">
            {data?.length > 0 && data.map((item, index) => (
                <SideBarItem data={item} key={index} index={index} />
            ))}
        </div>
    );
}

export default SlideBar;