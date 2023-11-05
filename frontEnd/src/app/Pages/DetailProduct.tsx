import Comments from "@/Components/Comments/Comments";
import GenerralProductHeader from "@/Components/Header/GenerralProductHeader/GenerralProductHeader";
import CartModal from "@/Components/Modal/CartModal/CartModal";
import Notification from "@/Components/PageLoader/Notification";
import PageLoader from "@/Components/PageLoader/PageLoader";
import ProductInfo from "@/Components/Slide/DetailProductSlide/DetailProductSlide";
import Slide from "@/Components/Slide/Slide";
import BoxColor from "@/Components/commonListing/DetailBox/BoxColor/BoxProduct";
import BoxProduct from "@/Components/commonListing/DetailBox/BoxProduct/BoxProduct";
import Incentives from "@/Components/commonListing/Incentives/Incentives";
import InfoProduct from "@/Components/commonListing/InfoProduct/InfoProduct";
import Star from "@/Components/commonListing/Star/Start";
import Product from "@/Components/productListing/Product/Product";
import Reviews from "@/Components/productListing/Reviews/Reviews";
import { ProductType } from "@/common/product";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { setshowCart } from "../Slices/common/showCartSlice";
import { addToCart, getAllCart } from "../action/CartActon";
import { getAllProduct, getProductById } from "../action/product";
const DetailProduct = () => {
    const [listImg, setListImg] = useState<any>([
        {
            imageUrl: "",
        },
    ]);
    const productDetail = useSelector(
        (state: any) => state.productDetail.data as ProductType
    );
    const [productVersion, setProductVersion] = useState<number | string>("");
    const dispatch = useDispatch<any>();
    const productSlimiler = useSelector((state: any) => state.allproduct.data);
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const allCart = useSelector((sate: any) => sate.allCart.data);
    const route = useNavigate();
    const params = useParams();
    const pageLevelLoading = useSelector(
        (sate: any) => sate.pageLevelLoading.pageLevelLoading
    );
    useEffect(() => {
        dispatch(setPageLevelLoading(true));
        dispatch(getProductById(params?.productId || 1));
        dispatch(setPageLevelLoading(true));
        dispatch(getAllCart());
    }, [dispatch, params]);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(allCart.items));
    }, [allCart]);
    useEffect(() => {
        if (productDetail?.catalogs?.categoryId) {
            dispatch(
                getAllProduct({
                    Filters: {
                        CategoryId: productDetail?.catalogs?.categoryId,
                    },
                })
            );
        }
    }, [dispatch, productDetail]);
    useEffect(() => {
        if (productDetail) dispatch(setPageLevelLoading(false));
    });
    useEffect(() => {
        if (productDetail?.productVersions) {
            const listImg = productDetail.productVersions
                .filter((productVersion) => productVersion.imageUrl)
                .map((productVersion) => ({
                    imageUrl: productVersion.imageUrl,
                }));
            listImg.push({ imageUrl: productDetail.imageUrl });
            setListImg(listImg);
        }
    }, [productDetail]);
    if (pageLevelLoading) {
        return <PageLoader pageLevelLoading={pageLevelLoading} />;
    }
    const handleAddCart = () => {
        if (!isLoggedIn) {
            toast.error("đăng nhập để tiếp tục");
            route("/login");
        }
        if (productVersion !== "") {
            dispatch(
                addToCart({ productVersionId: productVersion, quantity: 1 })
            ).then((response: any) => {
                if (response.payload.success) {
                    toast.success("thêm sản phẩm thành công");
                    dispatch(setshowCart(true));
                } else {
                    toast.error("thêm sản phẩm thất bài");
                }
                return dispatch(getAllCart());
            });
        } else {
            toast.error("vui lòng chọn sản phẩm mong muốn");
        }
    };
    const handleGetProductVersion = (productId: number | string) => {
        setProductVersion(productId);
    };
    return (
        productDetail && (
            <div className="flex flex-col gap-2 mb-8">
                <header className="flex items-center gap-2 pb-2 mb-3 border-b-[2px]">
                    <h1 className="font-bold text-lg">{productDetail.name}</h1>
                    <Star
                        numberStar={
                            productDetail.reviewsScore
                                ? Number(productDetail.reviewsScore)
                                : 5
                        }
                    />
                    <div>
                        <button className="text-custom-primary border-[1px] border-custom-primary p-1 text-sm cursor-pointer rounded-sm">
                            (+) So sánh
                        </button>
                    </div>
                </header>
                <div className="flex">
                    <div className="w-[60%] ">
                        <div className=" max-h-[400px]">
                            <Slide data={listImg} ItemSlide={ProductInfo} />
                        </div>
                        <InfoProduct />
                    </div>
                    {productDetail?.productVersions && (
                        <div className="ml-4 w-[40%]">
                            <BoxProduct
                                data={productDetail?.productVersions}
                                handleGetProductVersion={
                                    handleGetProductVersion
                                }
                            />
                            <div className="flex flex-col gap-2 mt-4 font-bold">
                                <h1>
                                    Chọn màu để xem giá và chi nhánh có hàng
                                </h1>
                                <BoxColor
                                    data={productDetail?.productVersions}
                                />
                            </div>
                            <div className="flex gap-2 items-center text-center mt-4">
                                <button className="flex-1 bg-custom-primary py-2 rounded-borderContnet text-white text-xl font-bold cursor-pointer">
                                    Mua ngay
                                </button>
                                <div
                                    onClick={handleAddCart}
                                    className="flex flex-col gap-1 items-center text-custom-primary px-2 py-2 border-[1px] border-custom-primary rounded-borderContnet cursor-pointer"
                                >
                                    <FaCartPlus />
                                    <span className="text-[8px] text-center font-bold">
                                        Thêm vào giỏ (+)
                                    </span>
                                </div>
                            </div>
                            <Incentives />
                        </div>
                    )}
                </div>

                {productSlimiler?.list && (
                    <div className="flex flex-col gap-2 p-2">
                        <GenerralProductHeader heading="sản phẩm liên quan" />
                        <Slide
                            data={productSlimiler.list}
                            ItemSlide={Product}
                            numberSlide={5}
                        />
                    </div>
                )}

                <Reviews data={productDetail} />
                <Comments />
                <CartModal />
                <Notification />
                {/* <CenterModal
                    data={
                        <div className="flex flex-col gap-2 p-2 justify-center">
                            <span className="font-medium text-xl text-slate-700 text-center w-full">
                                Vui lòng đăng nhập để tiếp tục !
                            </span>
                        </div>
                    }
                /> */}
            </div>
        )
    );
};

export default DetailProduct;
