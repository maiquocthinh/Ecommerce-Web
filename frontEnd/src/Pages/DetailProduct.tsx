import { FaStar } from "@react-icons/all-files/fa/FaStar";
import Slide from "../Components/Slide/Slide";
import BoxProduct from "../Components/components/BoxProduct/BoxProduct";
import InfoProduct from "../Components/components/InfoProduct/InfoProduct";
import Pay from "../Components/components/Pay/Pay";
import ProductInfo from "../Components/components/ProductInfoSlide/ProductInfo";
import Incentives from "../Components/components/Incentives/Incentives";
import HeaderProduct from "../Components/Header/HeaderProduct/HeaderProduct";
import GenerralProductHeader from "../Components/Header/GenerralProductHeader/GenerralProductHeader";
import Product from "../Components/Product/Product";
import Reviews from "../Components/components/Reviews/Reviews";
import Star from "../Components/components/Star/Start";
const DetailProduct = () => {
    const productImg = [
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxys23ultra_front_green_221122.jpg",
            title: "📣LAPTOP GAMING CHÍNH HÃNG📣 🔥Thu Laptop cũ lên đời Laptop mới giảm thêm 3 triệu🔥[01/07 - 31/10] Giảm thêm 5% trên giá khuyến mãi cho sinh viên - Tối đa 750K"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_s23_ultra_-_1.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_s23_ultra_-_2.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_s23_ultra_-_3.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/2/s23-ultra-xanh.png"
        }
    ]
    const listProduct = [
        {
            price: "30.490.000",
            title: "512GB"
        },
        {
            price: "    24.990.000",
            title: "256GB"
        },
        {
            price: "  21.990.000",
            title: "128GB"
        }
    ]
    const listColors = [
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-128-gbden.png",
            title: "Đen",
            price: "21.990.000"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-128-gbden.png",
            title: "Xanh dương",
            price: "21.990.000"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-hong.png",
            title: "Hồng",
            price: "22.590.000"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-128gb-xanh-la.png",
            title: "Xanh lá",
            price: "21.990.000"
        },
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
    return (
        <div className="">
            <header className="flex items-center gap-2 pb-2 mb-3 border-b-[2px]">
                <h1 className="font-bold text-lg">Samsung Galaxy S23 Ultra 256GB</h1>
                <Star numberStar={5} />
                <div>
                    <button className="text-custom-primary border-[1px] border-custom-primary p-1 text-sm cursor-pointer rounded-sm">
                        (+) So sánh
                    </button>
                </div>
            </header>
            <div className="flex">
                <div className="w-[60%] ">
                    <div className=" max-h-[400px]">
                        <Slide data={productImg} ItemSlide={ProductInfo} />
                    </div>
                    <InfoProduct />
                </div>
                <div className="ml-4 w-[40%]">
                    <BoxProduct data={listProduct} />
                    <div className="flex flex-col gap-2 mt-4 font-bold">
                        <h1>Chọn màu để xem giá và chi nhánh có hàng</h1>
                        <BoxProduct data={listColors} />
                    </div>
                    <Pay />
                    <Incentives />
                </div>
            </div>
            <div>
                <GenerralProductHeader heading="sản phẩm liên quan" />
                <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-12 gap-2">
                    {dataProduct?.length > 0 && dataProduct.map((product, index) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <Reviews />
        </div>
    );
}

export default DetailProduct;