import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import Filter from "../Components/Filter/Filter";
import HeaderProduct from "../Components/Header/HeaderProduct/HeaderProduct";
import OrderMobile from "../Components/components/OrderMobile/OrderMobile";
import Product from "../Components/Product/Product";
import Sort from "../Components/components/Sort/Sort";
import Comments from "../Components/Comments/Comments";
const ProductPage = () => {
    const branch = [
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_59.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_60.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_61.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_62.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_37_1.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_37_1.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_67.png"
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_59.png"
        }
    ]
    const dataProduct = [
        {
            src: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/google-tivi-coocaa-4k-70-inch-70c9.png",
            name: "Smart Google Tivi Coocaa 4K 70 inch 70C9",
            price: 999999,
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
        <div className="mt-4">
            <div className="flex items-center flex-wrap">
                {branch?.length > 0 && branch.map((item, index) => (
                    <img src={item.src} key={index} className="w-[10%] p-1 border-[1px] mx-1 cursor-pointer" />
                ))}
            </div>
            <OrderMobile />
            <Filter />
            <Sort />
            <div className="mt-4">
                <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-12 gap-2">
                    {dataProduct?.length > 0 && dataProduct.map((product, index) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <button className="shadow-custom py-2 px-12 cursor-pointer rounded-borderContnet text-sm hover:border-custom-primary border-[1px] hover:text-custom-primary">Xem thêm 20 sản phẩm</button>
            </div>
            <Comments />
        </div>
    );
}

export default ProductPage;