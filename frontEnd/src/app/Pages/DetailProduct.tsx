import Comments from "@/Components/Comments/Comments";
import GenerralProductHeader from "@/Components/Header/GenerralProductHeader/GenerralProductHeader";
import PageLoader from "@/Components/PageLoader/PageLoader";
import Product from "@/Components/Product/Product";
import Slide from "@/Components/Slide/Slide";
import BoxProduct from "@/Components/commonListing/BoxProduct/BoxProduct";
import ProductInfo from "@/Components/commonListing/DetailProductSlide/DetailProductSlide";
import Incentives from "@/Components/commonListing/Incentives/Incentives";
import InfoProduct from "@/Components/commonListing/InfoProduct/InfoProduct";
import Reviews from "@/Components/commonListing/Reviews/Reviews";
import Star from "@/Components/commonListing/Star/Start";
import { ProductType } from "@/common/product";
import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { getProductById } from "../action/action";
import { addToCart, getAllCart } from "../action/CartActon";

const DetailProduct = () => {
    const dispatch = useDispatch<any>();
    const productData = useSelector((state: any) => state.allproduct.data as ProductType[])
    const productDetail = useSelector((state: any) => state.product.data[0] as ProductType)
    const pageLevelLoading = useSelector((sate: any) => sate.pageLevelLoading.pageLevelLoading)
    const allCart = useSelector((sate: any) => sate.allCart.data)
    const params = useParams();
    useEffect(() => {
        dispatch(setPageLevelLoading(true))
        dispatch(getProductById(params?.productId || 1));
    }, [dispatch])
    const handlegetAllCart = () => {
        dispatch(getAllCart(1))
    }
    useEffect(() => {
        if (productDetail && productData) dispatch(setPageLevelLoading(false))
    })
    if (pageLevelLoading) {
        return (
            <PageLoader pageLevelLoading={pageLevelLoading} />
        );
    }
    const handleAddCart = () => {
        dispatch(addToCart({
            customer_id: 1,
            quantity: 1,
            products_versions_id: productDetail.id
        }))
        handlegetAllCart()
    }
    if (allCart) {
        localStorage.setItem("cart", JSON.stringify(allCart));
    }
    return (
        productDetail && (
            <div className="flex flex-col gap-2 mb-8">
                <header className="flex items-center gap-2 pb-2 mb-3 border-b-[2px]">
                    <h1 className="font-bold text-lg">{productDetail.name}</h1>
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
                            <Slide data={productDetail.listImg} ItemSlide={ProductInfo} />
                        </div>
                        <InfoProduct />
                    </div>
                    <div className="ml-4 w-[40%]">
                        <BoxProduct data={productDetail.listTypeProduct} />
                        <div className="flex flex-col gap-2 mt-4 font-bold">
                            <h1>Chọn màu để xem giá và chi nhánh có hàng</h1>
                            <BoxProduct data={productDetail.listColorProduct} />
                        </div>
                        <div className="flex gap-2 items-center text-center mt-4">
                            <button className="flex-1 bg-custom-primary py-2 rounded-borderContnet text-white text-xl font-bold cursor-pointer">Mua ngay</button>
                            <div onClick={handleAddCart} className="flex flex-col gap-1 items-center text-custom-primary px-2 py-2 border-[1px] border-custom-primary rounded-borderContnet cursor-pointer">
                                <FaCartPlus />
                                <span className="text-[8px] text-center font-bold">Thêm vào giỏ (+)</span>
                            </div>
                        </div>
                        <Incentives />
                    </div>
                </div>
                <div>
                    <GenerralProductHeader heading="sản phẩm liên quan" />
                    <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-10 gap-2">
                        {productData?.length > 0 && productData.map((product, index) => (
                            <Product data={product} key={index} col={2} />
                        ))}
                    </div>
                </div>
                <Reviews />
                <Comments />
            </div>
        )
    );
}

export default DetailProduct;