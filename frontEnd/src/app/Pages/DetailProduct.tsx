import GenerralProductHeader from "@/Components/Header/GenerralProductHeader/GenerralProductHeader";
import ComponentLevelLoader from "@/Components/Loader/componentlevel";
import CartModal from "@/Components/Modal/CartModal/CartModal";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
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
import Reviews from "@/Components/Reviews/Reviews";
import { ProductType, productVersion } from "@/common/product";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { setComponentLevelLoading } from "../Slices/common/componentLeveLoadingSlice";
import { setshowCart } from "../Slices/common/showCartSlice";
import { addToCart, getAllCart } from "../action/CartActon";
import { checkoutWidthproductWithAuthentication } from "../action/checkout";
import { getAllProduct, getProductById } from "../action/product";
const DetailProduct = () => {
    const [listImg, setListImg] = useState<any>([
        {
            imageUrl: "",
        },
    ]);
    const [numberProductbuy, setNumberProductbuy] = useState<number>(1);
    const productDetail = useSelector(
        (state: any) => state.productDetail.data as ProductType
    );
    const [productVersion, setProductVersion] = useState<productVersion>();
    const [showBuyProduct, setShowBuyProduct] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const productSlimiler = useSelector((state: any) => state.allproduct.data);
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const allCart = useSelector((sate: any) => sate.allCart.data);
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
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
        if (productVersion?.id) {
            dispatch(
                addToCart({ productVersionId: productVersion.id, quantity: 1 })
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
    const handleGetProductVersion = (productVersion: productVersion) => {
        setProductVersion(productVersion);
    };
    const handleByProduct = () => {
        if (!productVersion) {
            toast.error("vui lòng chọn sản phẩm trước khi mua hàng");
        } else {
            setShowBuyProduct(true);
        }
    };
    const handleCheckoutWithAuthen = () => {
        dispatch(setComponentLevelLoading({ loading: true, id: "" }));
        if (showBuyProduct && productVersion && numberProductbuy > 0) {
            dispatch(
                checkoutWidthproductWithAuthentication([
                    {
                        productVersionId: Number(productVersion?.id),
                        quantity: numberProductbuy,
                    },
                ])
            ).then((response: any) => {
                if (response.payload.success) {
                    toast.success(
                        "đặt hàng thành công. chúc bạn có 1 trãi nghiệm tuyệt vời"
                    );
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    setShowBuyProduct(false);
                    setTimeout(() => {
                        route("/profile/order");
                    }, 1000);
                } else {
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    toast.error(
                        "đặt hàng thất bại. vui lòng quay lại sau vài phút!"
                    );
                }
            });
        }
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
                                <button
                                    onClick={handleByProduct}
                                    className="flex-1 bg-custom-primary opacity-80 hover:opacity-100 transition-all duration-150 py-2 rounded-md text-white text-xl font-bold cursor-pointer"
                                >
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

                {productDetail && productVersion ? (
                    <Reviews
                        data={productDetail}
                        productVersion={productVersion}
                    />
                ) : null}
                <CartModal />
                <Notification />
                <CenterModal
                    show={showBuyProduct}
                    setShow={setShowBuyProduct}
                    showModalTitle
                    showButtons
                    modalTitle={
                        <h1 className=" relative font-bold text-2xl">
                            Thông sản phẩm cần mua
                        </h1>
                    }
                    mainContent={
                        <div className="flex justify-center border-t border-b">
                            <div>
                                <img
                                    src={productVersion?.imageUrl}
                                    alt=""
                                    className="w-60 object-contain"
                                />
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <span className="font-medium text-lg text-slate-600">
                                    Tên : {productVersion?.name}
                                </span>
                                <span className="font-medium text-lg text-slate-600">
                                    Màu : {productVersion?.color}
                                </span>
                                {Number(productVersion?.originPrice) -
                                    Number(productVersion?.price) >
                                0 ? (
                                    <div className="flex gap-1">
                                        <span className="font-medium text-lg text-slate-600">
                                            giá :{" "}
                                        </span>
                                        <span className="font-medium text-lg text-slate-600 line-through">
                                            {`${
                                                Number(
                                                    productVersion?.originPrice
                                                ) * numberProductbuy
                                            }`}
                                        </span>
                                        <span className="font-medium text-lg text-custom-Colorprimary">
                                            {`${
                                                Number(productVersion?.price) *
                                                numberProductbuy
                                            }`}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-medium text-lg text-custom-Colorprimary">
                                        giá :{" "}
                                        {`${
                                            Number(productVersion?.price) *
                                            numberProductbuy
                                        }`}
                                    </span>
                                )}
                                <div className="flex gap-1">
                                    <span>Số lượng: </span>
                                    <input
                                        value={
                                            numberProductbuy > 0
                                                ? numberProductbuy
                                                : 1
                                        }
                                        onChange={(e) =>
                                            setNumberProductbuy(
                                                Number(e.target.value)
                                            )
                                        }
                                        type="number"
                                        className="border-2 text-center border-slate-600 rounded-md w-12"
                                    />
                                </div>
                            </div>
                            <button
                                className="absolute top-6 right-6 text-custom-bg_button"
                                onClick={() => setShowBuyProduct(false)}
                            >
                                <AiOutlineClose size={22} />
                            </button>
                        </div>
                    }
                    buttonComponent={
                        <div className="flex justify-center w-full pt-2">
                            <button
                                onClick={handleCheckoutWithAuthen}
                                className="mb-2 text-lg bg-custom-bg_button text-white p-2 rounded-md px-4 opacity-90 transition-all duration-150 hover:opacity-100"
                            >
                                {componentLoading.loading === true ? (
                                    <ComponentLevelLoader
                                        text={"đang đặt hàng"}
                                        color={"red"}
                                        loading={componentLoading.loading}
                                    />
                                ) : (
                                    "đặt hàng"
                                )}
                            </button>
                        </div>
                    }
                />
            </div>
        )
    );
};

export default DetailProduct;
