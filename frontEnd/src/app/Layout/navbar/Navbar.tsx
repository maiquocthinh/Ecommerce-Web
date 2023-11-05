import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import {
    FaCar,
    FaUser,
    FaSearch,
    FaCartPlus,
    FaBars,
    FaPhone,
} from "react-icons/fa";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Notification from "@/Components/PageLoader/Notification";
import { logout } from "@/app/action/UserAction";
import SearchModal from "@/Components/Modal/SearchModal";
import { setIsLoggedIn } from "@/app/Slices/user/auth";
interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
    const [isResults, setIsResults] = useState<boolean>(false);
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const allCart = useSelector((sate: any) => sate.allCart.data);
    const route = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("token");
        localStorage.clear();
        route("/");
    };
    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            dispatch(setIsLoggedIn(true));
        } else {
            dispatch(setIsLoggedIn(false));
        }
        if (allCart?.items)
            localStorage.setItem("cart", JSON.stringify(allCart.items));
    }, [isLoggedIn, dispatch, allCart]);
    const navListing = [
        {
            id: 1,
            Icon: <FaPhone />,
            title: "gọi mua hàng",
        },
        {
            id: 2,
            Icon: <FaCar />,
            title: "Tra cứu đơn hàng",
            link: "order",
        },
        {
            id: 3,
            Icon: <FaCartPlus />,
            title: "giỏ hàng",
            link: "cart",
        },
    ];
    return (
        <div className="w-full h-header bg-primary border-border border-b fixed z-10">
            <div className="md:container md:mx-auto mx-4 sm:mx-8 xl:w-3/4 h-full">
                <div className="flex justify-between items-center gap-4 h-full">
                    <div className="md:hidden cursor-pointer text-white">
                        <FaBars className="text-2xl" />
                    </div>
                    <div className="hidden md:block">
                        <Link to="/">
                            <img
                                src="https://cdn.cellphones.com.vn/media/logo/logo-cps-full-2.png"
                                alt="avata"
                                height={30}
                                width={160}
                            />
                        </Link>
                    </div>
                    <div className="relative w-80 flex items-center justify-start">
                        <div className=" bg-white rounded-l-search px-3 border-r-2 cursor-pointer text-black">
                            <FaSearch className="h-10" />
                        </div>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            placeholder="bạn cần tìm gì ?"
                            className="rounded-r-search h-10 w-full pr-6 pl-2 text-black"
                        />
                        {showSearchModal && (
                            <Fragment>
                                <div className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-sm text-red-500">
                                    {isResults ? (
                                        <AiOutlineClose />
                                    ) : (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    )}
                                </div>
                                <SearchModal />
                            </Fragment>
                        )}
                    </div>
                    <div className="md:flex gap-4 hidden">
                        {navListing?.length > 0 &&
                            navListing.map((item) => (
                                <div
                                    className={`cursor-pointer`}
                                    key={item.id}
                                    onClick={() => route(`/${item?.link}`)}
                                >
                                    <div
                                        className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}
                                    >
                                        {item.Icon}
                                        <span className="ml-2 text-sm font-bold">
                                            {capitalizeFirstLetter(item.title)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="flex gap-2">
                        {isLoggedIn === true ? (
                            <div
                                onClick={handleLogout}
                                className={`cursor-pointer`}
                            >
                                <div
                                    className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}
                                >
                                    <FiLogOut />
                                    <span className="ml-2 text-sm font-bold">
                                        {capitalizeFirstLetter("đăng xuất")}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => route("/login")}
                                className={`cursor-pointer`}
                            >
                                <div
                                    className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}
                                >
                                    <FaUser />
                                    <span className="ml-2 text-sm font-bold">
                                        {capitalizeFirstLetter("đăng nhập")}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
};

export default Navbar;
