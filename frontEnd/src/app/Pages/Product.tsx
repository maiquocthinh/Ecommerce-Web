import Filter from "@/Components/Filter/Filter";
import Sort from "@/Components/Filter/Sort/Sort";
import OrderMobile from "@/Components/commonListing/OrderMobile/OrderMobile";
import Product from "@/Components/productListing/Product/Product";
import { ProductType } from "@/common/product";
import { branch } from "@/utils/Data";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllBrands } from "../action/catalogs";
const ProductPage = () => {
    const param = useParams();
    const productdata = useSelector(
        (state: any) => state.allproduct.data as ProductType[]
    );
    const allBrands = useSelector((state: any) => state.allBrands.data);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);
    return (
        <div className="mt-4">
            <div className="flex items-center flex-wrap">
                {branch?.length > 0 &&
                    branch.map((item, index) => (
                        <img
                            alt=""
                            src={item.src}
                            key={index}
                            className="w-[10%] p-1 border-[1px] mx-1 cursor-pointer"
                        />
                    ))}
            </div>
            <OrderMobile />
            <div className="bg-backgroundSale rounded-borderContnet p-3 mt-4">
                {/* {saleProductTablet && (
                    <HotSale
                        data={
                            changedDataSale === "mobile"
                                ? saleProductMobile
                                : changedDataSale === "tablet"
                                ? saleProductTablet
                                : saleProductAccessories
                        }
                        handleChangeData={handleChangeDatasale}
                    />
                )} */}
            </div>
            <Filter />
            <Sort />
            <div className="mt-4">
                <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-10 gap-2">
                    {productdata?.length > 0 &&
                        productdata.map((product, index) => (
                            <Product data={product} key={index} col={2} />
                        ))}
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <button className="shadow-custom py-2 px-12 cursor-pointer rounded-borderContnet text-sm hover:border-custom-primary border-[1px] hover:text-custom-primary">
                    Xem thêm 20 sản phẩm
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
