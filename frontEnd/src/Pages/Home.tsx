import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import Slide from "../Components/Slide/Slide";
import ModalMenu from "../Components/components/ModalMenu/ModalMenu";
import RightBar from "../Layout/RightBar/RightBar";
import { selectShowModal } from "../Components/components/ModalMenu/modalSlice";
import HotSale from "../Components/HotSale/HotSale";
import SlideBar from "../Layout/Sidebar/SideBar";
import Product from "../Components/Product/Product";
import Poster from "../Components/components/Poster/Poster";
import HeaderProduct from "../Components/Header/HeaderProduct/HeaderProduct";
import GeneralProduct from "../Components/GeneralProduct/GeneralProduct";
import GenerralProductHeader from "../Components/Header/GenerralProductHeader/GenerralProductHeader";
import Banner from "../Components/Banner/Banner";
import Footer from "../Layout/Footer/Footer";
interface HomeProps {

}
const Home: React.FC<HomeProps> = () => {
    const showModal = useSelector(selectShowModal);
    const dataSlide = [
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/oppo-month-sliding-0109.png",
            name: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-realme%2011-009.jpg",
            name: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-normal-th9-tv-xiaomi-a.jpg",
            name: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/tecno-thang-9-sliding-0097.png",
            title: "hello"
        }
    ]
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
    const listProduct = [
        "Apple",
        "Samsung",
        "Xiaomi",
        "OPPO",
        "vivo",
        "realme",
        "Nokia",
        "ASUS",
        "Tecno",
        "Xem tất cả",
    ]
    const dataGeneralProduct = [
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
            heading: "nỗi bật"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
            heading: "Phụ kiện apple"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
            heading: "dán màn hình"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-108.svg",
            heading: "op lưng- bao da"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-114.svg",
            heading: "cáp sạc"
        }, {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
            heading: "nỗi bật"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
            heading: "Phụ kiện apple"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
            heading: "dán màn hình"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-108.svg",
            heading: "op lưng- bao da"
        },
        {
            src: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-114.svg",
            heading: "cáp sạc"
        },
    ]
    const credit = [
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/ocb-sliding-uudaithanhtoan.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/th-hieu-ss-0013.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/banner-sli-vib.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/banner-uu-dai-shopeepay.png"
        }
    ]
    const branch = [
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/banner-sliding-apple-112.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/th-hieu-ss-0013.png",
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/SIS%20asus.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/xiaomi.png"
        }
    ]
    return (
        <div className="flex flex-col gap-3">
            <div className="relative grid grid-cols-12 gap-4">
                <div className="lg:block col-span-2 hidden" >
                    <SlideBar />
                </div >
                <div className="shadow-custom rounded-borderContnet overflow-hidden lg:col-span-7 col-span-12">
                    <Slide data={dataSlide} ItemSlide={Poster} />
                </div>
                <div className="col-span-3 hidden lg:block">
                    <RightBar />
                </div>
                {
                    showModal && (
                        <div className="col-span-10 absolute z-20 left-modal left-1/6 right-0 bg-white overflow-hidden rounded-r-borderContnet">
                            <ModalMenu />
                        </div>
                    )
                }
            </div >
            <div className="bg-backgroundSale rounded-borderContnet p-3">
                <HotSale />
                <div className="mt-4">
                    <Slide data={dataProduct} ItemSlide={Product} numberSlide={5} />
                </div>
            </div>
            <div >
                <HeaderProduct listProduct={listProduct} heading="ĐIỆN THOẠI NỔI BẬT NHẤT" />
                <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-12 gap-2">
                    {dataProduct?.length > 0 && dataProduct.map((product, index) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div >
                <HeaderProduct listProduct={listProduct} heading="ĐIỆN THOẠI NỔI BẬT NHẤT" />
                <div className=" grid grid-clos-1 sm:grid-cols-4 md:grid-cols-12 gap-2 ">
                    {dataProduct?.length > 0 && dataProduct.map((product, index) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div>
                <HeaderProduct listProduct={listProduct} heading="ĐIỆN THOẠI NỔI BẬT NHẤT" />
                <div className=" grid grid-clos-1 sm:grid-cols-4 md:grid-cols-12 gap-2 ">
                    {dataProduct?.length > 0 && dataProduct.map((product, index) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div>
                <GenerralProductHeader />
                <div className=" grid grid-cols-10 gap-2 ">
                    {
                        dataGeneralProduct?.length > 0 && dataGeneralProduct.map((product, index) => (
                            <GeneralProduct key={index} data={product} />
                        ))
                    }
                </div>
            </div>
            <div>
                <Banner data={credit} heading="ƯU ĐÃI THANH TOÁN" />
            </div>
            <div>
                <Banner data={branch} heading="CHUYÊN TRANG THƯƠNG HIỆU" />
            </div>
        </div >
    );
}

export default Home;