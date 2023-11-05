import HeaderProduct from "@/Components/Header/HeaderProduct/HeaderProduct";
import PageLoader from "@/Components/PageLoader/PageLoader";
import Product from "@/Components/productListing/Product/Product";
import ModalMenu from "@/Components/commonListing/ModalMenu/ModalMenu";
import { selectShowModal } from "@/Components/commonListing/ModalMenu/modalSlice";
import SlideBar from "@/app/Layout/Sidebar/SideBar";
import { ProductType } from "@/common";
import { listProduct, posterData } from "@/utils/Data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { getAllProduct } from "../action/product";
import Slide from "@/Components/Slide/Slide";
import Poster from "@/Components/Slide/Poster/Poster";
import HotSale from "@/Components/productListing/HotSale/HotSale";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const dispatch = useDispatch<any>();
    const showModal = useSelector(selectShowModal);
    const [changedDataSale, setChangedDataSale] = useState("mobile");
    const [data, setData] = useState({
        labtop: [] as ProductType.ProductType[],
        mobile: [] as ProductType.ProductType[],
        mobileSale: [] as ProductType.ProductType[],
        labtopSale: [] as ProductType.ProductType[],
    });
    const productdata = useSelector((state: any) => state.allproduct.data);
    const pageLevelLoading = useSelector(
        (sate: any) => sate.pageLevelLoading.pageLevelLoading
    );
    useEffect(() => {
        if (productdata?.list) {
            const labtopProducts = productdata.list.filter(
                (product: ProductType.ProductType) =>
                    product.catalogs.categoryId === 3
            );

            const mobileProducts = productdata.list.filter(
                (product: ProductType.ProductType) =>
                    product.catalogs.categoryId === 2
            );
            const mobileSale = productdata.list.filter(
                (product: ProductType.ProductType) => {
                    if (
                        product.discountPercent !== 0 &&
                        product.catalogs.categoryId === 2
                    ) {
                        return product;
                    }
                }
            );
            const labtopSale = productdata.list.filter(
                (product: ProductType.ProductType) => {
                    if (
                        product.discountPercent !== 0 &&
                        product.catalogs.categoryId === 3
                    ) {
                        return product;
                    }
                }
            );
            setData({
                labtop: labtopProducts,
                mobile: mobileProducts,
                labtopSale: labtopSale,
                mobileSale: mobileSale,
            });
        }
    }, [productdata]);
    useEffect(() => {
        dispatch(setPageLevelLoading(true));
        dispatch(getAllProduct({ pageSize: "40", pageIndex: "1" }));
    }, [dispatch]);
    useEffect(() => {
        if (productdata?.list) {
            dispatch(setPageLevelLoading(false));
        }
    }, [productdata, dispatch]);

    const handleChangeDatasale = (link: string) => {
        setChangedDataSale(link);
    };
    if (pageLevelLoading) {
        return <PageLoader pageLevelLoading={pageLevelLoading} />;
    }
    return (
        <div className="flex flex-col gap-6">
            <div className="relative grid grid-cols-12 gap-4">
                <div className="lg:block col-span-2 hidden">
                    <SlideBar />
                </div>
                <div className="shadow-custom rounded-borderContnet overflow-hidden lg:col-span-10 col-span-12">
                    {posterData && (
                        <Slide
                            data={posterData}
                            ItemSlide={Poster}
                            slideDescription
                        />
                    )}
                </div>
                {showModal && (
                    <div className="col-span-10 absolute z-20 left-modal left-1/6 right-0 bg-white overflow-hidden rounded-r-borderContnet">
                        <ModalMenu />
                    </div>
                )}
            </div>
            <div className="bg-backgroundSale rounded-borderContnet p-3">
                {data ? (
                    <HotSale
                        data={
                            changedDataSale === "mobile"
                                ? data.mobile
                                : data.labtop
                        }
                        handleChangeData={handleChangeDatasale}
                    />
                ) : null}
            </div>
            <div>
                <HeaderProduct
                    listProduct={listProduct}
                    heading="LAPTOP THOẠI NỔI BẬT NHẤT"
                />
                <Slide ItemSlide={Product} data={data.labtop} numberSlide={5} />
            </div>
            <div>
                <HeaderProduct
                    listProduct={listProduct}
                    heading="ĐIỆN THOẠI NỔI BẬT NHẤT"
                />
                <Slide ItemSlide={Product} data={data.mobile} numberSlide={4} />
            </div>
            <div>
                <HeaderProduct
                    listProduct={listProduct}
                    heading="SẢN PHẨM ĐANG GIẢM GIÁ"
                />
                <Slide ItemSlide={Product} data={data.mobile} numberSlide={4} />
            </div>
            {/* <div>
                <Banner data={credit} heading="ƯU ĐÃI THANH TOÁN" />
            </div>
            <div>
                <Banner data={branch} heading="CHUYÊN TRANG THƯƠNG HIỆU" />
            </div> */}
        </div>
    );
};

export default Home;
