import { setshowAdminSlide } from "@/app/Slices/common/showAdminSlide";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getAllBrands,
    getAllCategories,
    getAllNeeds,
} from "@/app/action/catalogs";
const AdminHeader = () => {
    const showAdminSlide = useSelector(
        (state: any) => state.showAdminSlide.showAdminSlide
    );
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllBrands());
        dispatch(getAllNeeds());
    }, [dispatch]);
    return (
        <div className="bg-custom-admin_bg_content">
            <div
                className={`flex justify-between h-[60px] items-center ${
                    !showAdminSlide ? "mx-auto w-[90%]" : null
                }`}
            >
                <button
                    onClick={() => dispatch(setshowAdminSlide(!showAdminSlide))}
                    className={`border-none text-custom-addmin_Active__color ${
                        showAdminSlide ? "pl-4" : null
                    }`}
                >
                    {showAdminSlide ? (
                        <AiOutlineMenuFold size={22} />
                    ) : (
                        <AiOutlineMenuUnfold size={22} />
                    )}
                </button>
                <button className="rounded-full bg-gray-500  text-white h-8 w-8 font-medium focus:outline-none text-center">
                    <span>A</span>
                </button>
            </div>
        </div>
    );
};

export default AdminHeader;
