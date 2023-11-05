import BoxContent from "@/Components/BoxContent/BoxContent";
import Product from "@/Components/productListing/Product/Product";
import SideBarProfile from "@/Components/SideBarProfile/SideBarProfile";
import Slide from "@/Components/Slide/Slide";
import UserInfo from "@/Components/commonListing/UserInfo/UserInfo";
import { ProductType } from "@/common/product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../action/UserAction";
const Profile = () => {
    const productdata = useSelector(
        (state: any) => state.allproduct.data as ProductType[]
    );
    const profile = useSelector((state: any) => state.profile.data);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    useEffect(() => {
        if (profile) {
            console.log("profile", profile);
        }
    }, [profile]);
    return (
        <div className="flex gap-4 min-h-full">
            <div className="w-[20%] border-r-[1px] bg-white rounded-t-borderContnet overflow-hidden">
                <SideBarProfile />
            </div>
            <div className="w-[80%] flex flex-col gap-4">
                <div className="flex gap-2 ">
                    <UserInfo />
                    <UserInfo />
                </div>
                <div className="flex gap-2">
                    <BoxContent />
                    <BoxContent />
                    <BoxContent />
                </div>
                <div className="bg-backgroundSale rounded-borderContnet p-3 mb-10">
                    {/* <HotSale /> */}
                    <div className="mt-4">
                        <Slide
                            data={productdata}
                            ItemSlide={Product}
                            numberSlide={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
