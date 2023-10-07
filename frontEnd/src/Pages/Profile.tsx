import BoxContent from "../Components/BoxContent/BoxContent";
import HotSale from "../Components/HotSale/HotSale";
import Product from "../Components/Product/Product";
import SideBarProfile from "../Components/SideBarProfile/SideBarProfile";
import Slide from "../Components/Slide/Slide";
import UserInfo from "../Components/components/UserInfo/UserInfo";

const Profile = () => {
    const dataProduct = [
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/google-tivi-coocaa-4k-70-inch-70c9.png",
            name: "Smart Google Tivi Coocaa 4K 70 inch 70C9",
            price: 999999,
            sale: 0.1,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/a/s/asus-rog-phone-6-diablo.png",
            name: "ASUS ROG Phone 6 Diablo 16GB 512GB ",
            price: 888888,
            sale: 0.2,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/google-tivi-coocaa-4k-70-inch-70c9.png",
            name: "Smart Google Tivi Coocaa 4K 70 inch 70C9",
            price: 777777,
            sale: 0.3,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/i/tivi-coocaa-hd-32-inch-32r5_1_.jpg",
            name: "Tivi Coocaa HD 32 inch 32R5 (model 2023)",
            price: 666666,
            sale: 0.4,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/google-tivi-coocaa-4k-55-inch-55v8_1_1.jpg",
            name: "Google Tivi Coocaa 4K 55 inch 55V8",
            price: 555555,
            sale: 0.5,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/s/1sdcsc.jpg",
            name: "realme C33 3GB 32GB",
            price: 444444,
            sale: 0.6,
        }, {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/google-tivi-coocaa-4k-70-inch-70c9.png",
            name: "Smart Google Tivi Coocaa 4K 70 inch 70C9",
            price: 999999,
            sale: 0.1,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/a/s/asus-rog-phone-6-diablo.png",
            name: "ASUS ROG Phone 6 Diablo 16GB 512GB ",
            price: 888888,
            sale: 0.2,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/google-tivi-coocaa-4k-70-inch-70c9.png",
            name: "Smart Google Tivi Coocaa 4K 70 inch 70C9",
            price: 777777,
            sale: 0.3,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/i/tivi-coocaa-hd-32-inch-32r5_1_.jpg",
            name: "Tivi Coocaa HD 32 inch 32R5 (model 2023)",
            price: 666666,
            sale: 0.4,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/google-tivi-coocaa-4k-55-inch-55v8_1_1.jpg",
            name: "Google Tivi Coocaa 4K 55 inch 55V8",
            price: 555555,
            sale: 0.5,
        },
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/s/1sdcsc.jpg",
            name: "realme C33 3GB 32GB",
            price: 444444,
            sale: 0.6,
        },
    ]
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
                        <Slide data={dataProduct} ItemSlide={Product} numberSlide={5} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;