import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import Banner from "../Components/Banner/Banner";
import GeneralProduct from "../Components/GeneralProduct/GeneralProduct";
import GenerralProductHeader from "../Components/Header/GenerralProductHeader/GenerralProductHeader";
import HeaderProduct from "../Components/Header/HeaderProduct/HeaderProduct";
import HotSale from "../Components/HotSale/HotSale";
import Product from "../Components/Product/Product";
import Slide from "../Components/Slide/Slide";
import ModalMenu from "../Components/components/ModalMenu/ModalMenu";
import { selectShowModal } from "../Components/components/ModalMenu/modalSlice";
import Poster from "../Components/components/Poster/Poster";
import RightBar from "../Layout/RightBar/RightBar";
import SlideBar from "../Layout/Sidebar/SideBar";
import { getAllProduct } from "../app/action/action";
interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    const showModal = useSelector(selectShowModal);
    const dispatch = useDispatch<any>();
    const productdata = useSelector((state: any) => state.allproduct.data)
    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch])
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
                {productdata && <div className="mt-4">
                    <Slide data={productdata} ItemSlide={Product} numberSlide={5} />
                </div>}
            </div>
            <div >
                <HeaderProduct listProduct={listProduct} heading="ĐIỆN THOẠI NỔI BẬT NHẤT" />
                <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-10 gap-2">
                    {productdata?.length > 0 && productdata.map((product: any, index: number) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div >
                <HeaderProduct listProduct={listProduct} heading="ĐIỆN THOẠI NỔI BẬT NHẤT" />
                <div className=" grid grid-clos-1 sm:grid-cols-4 md:grid-cols-10 gap-2 ">
                    {productdata?.length > 0 && productdata.map((product: any, index: number) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div>
                <HeaderProduct listProduct={listProduct} heading="ĐIỆN THOẠI NỔI BẬT NHẤT" />
                <div className=" grid grid-clos-1 sm:grid-cols-4 md:grid-cols-10 gap-2 ">
                    {productdata?.length > 0 && productdata.map((product: any, index: number) => (
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