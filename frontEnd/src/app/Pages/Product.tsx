import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import Filter from "@/Components/Filter/Filter";
import HeaderProduct from "@/Components/Header/HeaderProduct/HeaderProduct";
import OrderMobile from "@/Components/commonListing/OrderMobile/OrderMobile";
import Product from "@/Components/Product/Product";
import Sort from "@/Components/commonListing/Sort/Sort";
import Comments from "@/Components/Comments/Comments";
import { ProductType } from "@/common/product";
import { useSelector } from "react-redux";
import Slide from "@/Components/Slide/Slide";
import HotSale from "@/Components/HotSale/HotSale";
import { useState } from "react";
import { branch } from "@/utils/Data";
const ProductPage = () => {
    const [changedDataSale, setChangedDataSale] = useState("mobile")
    const productdata = useSelector((state: any) => state.allproduct.data as ProductType[])
    const laptopProduct = useSelector((state: any) => state.laptopProduct.data as ProductType[])
    const tabletProduct = useSelector((state: any) => state.tabletProduct.data as ProductType[])
    const saleProductMobile = useSelector((sate: any) => sate.saleProduct.data.mobile as ProductType[])
    const saleProductTablet = useSelector((sate: any) => sate.saleProduct.data.tablet as ProductType[])
    const saleProductAccessories = useSelector((sate: any) => sate.saleProduct.data.accessories as ProductType[])
    const handleChangeDatasale = (link: string) => {
        setChangedDataSale(link);
    }
    return (
        <div className="mt-4">
            <div className="flex items-center flex-wrap">
                {branch?.length > 0 && branch.map((item, index) => (
                    <img src={item.src} key={index} className="w-[10%] p-1 border-[1px] mx-1 cursor-pointer" />
                ))}
            </div>
            <OrderMobile />
            <div className="bg-backgroundSale rounded-borderContnet p-3 mt-4">
                {saleProductTablet &&
                    <HotSale data={changedDataSale === "mobile" ? saleProductMobile : changedDataSale === "tablet" ? saleProductTablet : saleProductAccessories} handleChangeData={handleChangeDatasale} />
                }
            </div>
            <Filter />
            <Sort />
            <div className="mt-4">
                <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-10 gap-2">
                    {productdata?.length > 0 && productdata.map((product, index) => (
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