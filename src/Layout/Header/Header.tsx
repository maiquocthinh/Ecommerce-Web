import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaPhone } from "@react-icons/all-files/fa/faPhone";
import { FaCar } from "@react-icons/all-files/fa/faCar";
import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import HeaderItem from "./headerItem";
interface HeaderProps {

}
const Header: React.FC<HeaderProps> = () => {
    const headerList = [
        {
            Icon: <FaPhone />,
            title: "gọi mua hàng"
        },
        {
            Icon: <FaCar />,
            title: "Tra cứu đơn hàng"
        },
        {
            Icon: <FaCartPlus />,
            title: "giỏ hàng"
        },
    ]
    const auth = [
        {
            Icon: <FaUser />,
            title: "đăng nhập"
        },
        // {
        //     Icon: <FaArrowRight />,
        //     title: "đăng kí"
        // }
    ]
    return (
        <div className="w-full h-header bg-primary border-border border-b">
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 flex justify-between items-center gap-4 h-full ">
                <div className="md:hidden cursor-pointer">
                    <FaBars className="text-2xl" />
                </div>
                <div className="hidden md:block">
                    <img src="https://cdn.cellphones.com.vn/media/logo/logo-cps-full-2.png" alt="avata" height={30} width={160} />
                </div>
                <div className="w-72 flex items-center justify-start">
                    <div className=" bg-white rounded-l-search px-3 border-r-2 cursor-pointer text-black">
                        <FaSearch className="h-10" />
                    </div>
                    <input type="text" placeholder="bạn cần tìm gì ?" className="rounded-r-search h-10 w-full pr-6 pl-2 text-black" />
                </div>
                <div className="md:flex gap-4 hidden">
                    {headerList?.length > 0 && headerList.map((item, index) => (
                        <HeaderItem data={item} key={index} />
                    ))}
                </div>
                <div className="flex gap-2">
                    {auth?.length > 0 && auth.map((item, index) => (
                        <HeaderItem data={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;