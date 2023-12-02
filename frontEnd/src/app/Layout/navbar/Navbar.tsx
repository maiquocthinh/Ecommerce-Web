import SearchModal from "@/Components/Modal/SearchModal";
import Notification from "@/Components/PageLoader/Notification";
import { setIsLoggedIn } from "@/app/Slices/user/auth";
import { logout } from "@/app/action/UserAction";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/Bi";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    FaBars,
    FaCar,
    FaCartPlus,
    FaPhone,
    FaSearch,
    FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/imgs/logo.png";
import {
    getAllProduct,
    getLaptopProduct,
    getMobileProduct,
    searchProduct,
} from "@/app/action/product";
import { ProductType } from "@/common/product";
import useDebounce from "@/app/hook/useDebounce";
import { getAllCategories, getAllNeeds } from "@/app/action/catalogs";
import { jwtDecode } from "jwt-decode";

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
    const [userName, setUserName] = useState("");
    const [reslutSearch, setReslutSearch] = useState<ProductType[]>([]);
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const allCart = useSelector((sate: any) => sate.allCart.data);
    const searchProductData = useSelector(
        (sate: any) => sate.searchProductData.data
    );

    const route = useNavigate();
    const debounce = useDebounce(searchValue, 1000) as string;
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(getAllProduct({ pageSize: "10", pageIndex: "1" }));
        dispatch(getLaptopProduct({ pageSize: "10", pageIndex: "1" }));
        dispatch(getMobileProduct({ pageSize: "10", pageIndex: "1" }));
        dispatch(getAllNeeds());
        dispatch(getAllCategories());
    }, [dispatch]);
    useEffect(() => {
        if (debounce.trim() !== "") {
            dispatch(searchProduct(debounce));
        }
    }, [dispatch, debounce]);
    useEffect(() => {
        if (searchProductData?.list?.length) {
            setReslutSearch(searchProductData?.list);
            setShowSearchModal(true);
        }
    }, [searchProductData]);
    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            const decodedValue = jwtDecode(Cookies.get("token") as string) as {
                family_name?: string;
                given_name?: string;
            };
            if (
                decodedValue &&
                decodedValue.family_name &&
                decodedValue.given_name
            ) {
                const userName = `${decodedValue?.family_name} ${decodedValue?.given_name}`;
                localStorage.setItem("userName", userName);
                setUserName(userName);
            }
            dispatch(setIsLoggedIn(true));
        } else {
            Cookies.remove("token");
            Cookies.remove("accessTokenExpiredIn");
            dispatch(setIsLoggedIn(false));
        }
        if (allCart?.items)
            localStorage.setItem("cart", JSON.stringify(allCart.items));
        const accessTokenExpiredIn = Cookies.get(
            "accessTokenExpiredIn"
        ) as string;
        const expirationTime = new Date(accessTokenExpiredIn);
        expirationTime.setDate(expirationTime.getDate() + 2);
        const currentTime = new Date();
        const isAccessTokenExpired = expirationTime < currentTime;
        if (isAccessTokenExpired) {
            dispatch(logout());
            Cookies.remove("token");
            localStorage.clear();
            route("/");
        }
    }, [isLoggedIn, dispatch, allCart]);
    const navListing = [
        {
            id: 2,
            Icon: <FaCar />,
            title: "Tra cứu đơn hàng",
            link: "profile/order",
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
                                src={logo}
                                alt="avata"
                                className="w-24 object-cover"
                            />
                        </Link>
                    </div>
                    <div
                        className={`relative w-80 flex items-center justify-start ${
                            showSearchModal && searchValue.trim() !== ""
                                ? "border rounded-t-borderContnet"
                                : ""
                        }`}
                    >
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
                                    {searchValue ? (
                                        reslutSearch ? (
                                            <button
                                                onClick={() => {
                                                    setSearchValue("");
                                                    setShowSearchModal(false);
                                                }}
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        ) : (
                                            <AiOutlineLoading3Quarters className="animate-spin" />
                                        )
                                    ) : null}
                                </div>
                                {reslutSearch?.length &&
                                searchValue.trim() !== "" ? (
                                    <SearchModal data={reslutSearch} />
                                ) : null}
                            </Fragment>
                        )}
                    </div>
                    <div className="md:flex gap-4 hidden">
                        <a
                            href="https://www.facebook.com/dinhnguyenminhhoang"
                            className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}
                        >
                            <FaPhone />
                            <span className="ml-2 text-sm font-bold">
                                {capitalizeFirstLetter("liên hệ hỗ trợ")}
                            </span>
                        </a>
                        {navListing?.length > 0 &&
                            isLoggedIn &&
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
                                onClick={() => route("/profile/home")}
                                className={`cursor-pointer`}
                            >
                                <div
                                    className={`flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear`}
                                >
                                    <BiUserCircle size={28} />
                                    <span className="ml-2 text-sm font-bold">
                                        {userName}
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
