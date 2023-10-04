import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaCar } from "@react-icons/all-files/fa/faCar";
import { FaPhone } from "@react-icons/all-files/fa/faPhone";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navigate from "../../Components/components/Navigate/Navigate";
import HeaderItem from "./headerItem";
import { Link } from "react-router-dom";
interface HeaderProps {

}
const Header: React.FC<HeaderProps> = () => {
    const pathArr = useSelector((state: any) => state.path)
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
        <div className="w-full h-header bg-primary border-border border-b fixed z-10">
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 h-full">
                <div className="flex justify-between items-center gap-4 h-full">
                    <div className="md:hidden cursor-pointer text-white">
                        <FaBars className="text-2xl" />
                    </div>
                    <div className="hidden md:block">
                        <Link to="/">
                            <img src="https://cdn.cellphones.com.vn/media/logo/logo-cps-full-2.png" alt="avata" height={30} width={160} />
                        </Link>
                    </div>
                    <div className="w-80 flex items-center justify-start">
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
                {/* {pathArr?.length > 0 && <Navigate listNav={pathArr} />} */}
            </div>
            {/* <SearchModal /> */}
        </div>
    );
}

export default Header;