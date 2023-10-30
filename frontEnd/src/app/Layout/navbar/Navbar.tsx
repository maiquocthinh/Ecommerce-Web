import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaCar } from "@react-icons/all-files/fa/faCar";
import { FaPhone } from "@react-icons/all-files/fa/faPhone";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose"
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters"
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";
import HeaderItem from "./headerItem";
import Cookies from "js-cookie";
import Notification from "@/Components/Notification";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react"
import { logout } from "@/app/action/UserAction";
import SearchModal from "@/Components/Modal/SearchModal";
interface NavbarProps {

}
const Navbar: React.FC<NavbarProps> = () => {
    const pathArr = useSelector((state: any) => state.path)
    const [isResults, setIsResults] = useState<boolean>(false)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")
    const route = useNavigate();
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)
    const handleLogout = () => {
        dispatch(logout())
        Cookies.remove("token");
        localStorage.clear();
        route("/");
    }
    const navListing = [
        {
            id: 1,
            Icon: <FaPhone />,
            title: "gọi mua hàng"
        },
        {
            id: 2,
            Icon: <FaCar />,
            title: "Tra cứu đơn hàng",
            link: "order"
        },
        {
            id: 3,
            Icon: <FaCartPlus />,
            title: "giỏ hàng",
            link: "cart"
        },
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
                    <div className="relative w-80 flex items-center justify-start">
                        <div className=" bg-white rounded-l-search px-3 border-r-2 cursor-pointer text-black">
                            <FaSearch className="h-10" />
                        </div>
                        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="bạn cần tìm gì ?" className="rounded-r-search h-10 w-full pr-6 pl-2 text-black" />
                        {showSearchModal && (
                            <Fragment>
                                <div className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-sm text-red-500">
                                    {isResults ? <AiOutlineClose /> : <AiOutlineLoading3Quarters className="animate-spin" />}
                                </div>
                                <SearchModal />
                            </Fragment>
                        )}
                    </div>
                    <div className="md:flex gap-4 hidden">
                        {navListing?.length > 0 && navListing.map((item) => (
                            <div className={`cursor-pointer`} key={item.id} onClick={() => route(`/${item?.link}`)}>
                                <div className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}>
                                    {item.Icon}
                                    <span className="ml-2 text-sm font-bold">{capitalizeFirstLetter(item.title)}</span>
                                </div>
                            </div >
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {
                            isLoggedIn ?
                                <div onClick={handleLogout} className={`cursor-pointer`}>
                                    <div className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}>
                                        <FiLogOut />
                                        <span className="ml-2 text-sm font-bold">{capitalizeFirstLetter("đăng xuất")}</span>
                                    </div>
                                </div >
                                :
                                <div onClick={() => route("/login")} className={`cursor-pointer`}>
                                    <div className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}>
                                        <FaUser />
                                        <span className="ml-2 text-sm font-bold">{capitalizeFirstLetter("đăng nhập")}</span>
                                    </div>
                                </div >
                        }
                    </div>
                </div>
                {/* {pathArr?.length > 0 && <Navigate listNav={pathArr} />} */}
            </div>
            <Notification />
        </div>
    );
}

export default Navbar;