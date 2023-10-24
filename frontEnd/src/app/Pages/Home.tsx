import GeneralProduct from "@/Components/GeneralProduct/GeneralProduct";
import GenerralProductHeader from "@/Components/Header/GenerralProductHeader/GenerralProductHeader";
import HeaderProduct from "@/Components/Header/HeaderProduct/HeaderProduct";
import HotSale from "@/Components/HotSale/HotSale";
import PageLoader from "@/Components/PageLoader/PageLoader";
import Poster from "@/Components/Poster/Poster";
import Product from '@/Components/Product/Product';
import Slide from '@/Components/Slide/Slide';
import ModalMenu from "@/Components/commonListing/ModalMenu/ModalMenu";
import { selectShowModal } from "@/Components/commonListing/ModalMenu/modalSlice";
import RightBar from "@/app/Layout/RightBar/RightBar";
import SlideBar from "@/app/Layout/Sidebar/SideBar";
import { DevicesType, PosterType, ProductType } from "@/common";
import { listProduct } from "@/utils/Data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { getAllProduct, getDevices, getLaptopProduct, getPosterSale, getSaleProduct, getTabletProduct } from "../action/action";


interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    const dispatch = useDispatch<any>();
    const showModal = useSelector(selectShowModal);
    const [changedDataSale, setChangedDataSale] = useState("mobile")
    const productdata = useSelector((state: any) => state.allproduct.data as ProductType.ProductType[])
    const laptopProduct = useSelector((state: any) => state.laptopProduct.data as ProductType.ProductType[])
    const tabletProduct = useSelector((state: any) => state.tabletProduct.data as ProductType.ProductType[])
    const saleProductMobile = useSelector((sate: any) => sate.saleProduct.data.mobile as ProductType.ProductType[])
    const saleProductTablet = useSelector((sate: any) => sate.saleProduct.data.tablet as ProductType.ProductType[])
    const saleProductAccessories = useSelector((sate: any) => sate.saleProduct.data.accessories as ProductType.ProductType[])
    const posterSale = useSelector((sate: any) => sate.posterSale.data as PosterType.PosterType[])
    const devicesData = useSelector((sate: any) => sate.devices.data as DevicesType.DevicesType[])
    const pageLevelLoading = useSelector((sate: any) => sate.pageLevelLoading.pageLevelLoading)

    useEffect(() => {
        dispatch(setPageLevelLoading(true))
        dispatch(getAllProduct({ limit: 10, type: "mobile" }));
        dispatch(getLaptopProduct({ limit: 10, type: "laptop" }));
        dispatch(getTabletProduct({ limit: 10, type: "tablet" }));
        dispatch(getSaleProduct());
        dispatch(getPosterSale());
        dispatch(getDevices());
    }, [dispatch])
    useEffect(() => {
        if (saleProductMobile && posterSale) {
            dispatch(setPageLevelLoading(false))
        }
    }, [saleProductMobile, posterSale])

    const handleChangeDatasale = (link: string) => {
        setChangedDataSale(link);
    }
    if (pageLevelLoading) {
        return (
            <PageLoader pageLevelLoading={pageLevelLoading} />
        );
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="relative grid grid-cols-12 gap-4">
                <div className="lg:block col-span-2 hidden" >
                    <SlideBar />
                </div >
                <div className="shadow-custom rounded-borderContnet overflow-hidden lg:col-span-7 col-span-12">
                    {posterSale &&
                        <Slide data={posterSale} ItemSlide={Poster} slideDescription />
                    }
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
                {saleProductTablet &&
                    <HotSale data={changedDataSale === "mobile" ? saleProductMobile : changedDataSale === "tablet" ? saleProductTablet : saleProductAccessories} handleChangeData={handleChangeDatasale} />
                }
            </div>
            <div >
                <HeaderProduct listProduct={listProduct} heading="ĐIỆN THOẠI NỔI BẬT NHẤT" />
                <div className=" grid grid-cols-1 sm:grid-cols-4 md:grid-cols-10 gap-2">
                    {productdata?.length > 0 && productdata.map((product: ProductType.ProductType, index: number) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div >
                <HeaderProduct listProduct={listProduct} heading="LAPTOP PHỔ BIẾN" />
                <div className=" grid grid-clos-1 sm:grid-cols-4 md:grid-cols-10 gap-2 ">
                    {laptopProduct?.length > 0 && laptopProduct.map((product: ProductType.ProductType, index: number) => (
                        <Product data={product} key={index} col={2} />
                    ))}
                </div>
            </div>
            <div >
                <HeaderProduct listProduct={listProduct} heading="MÀN HÌNH, MÁY TÍNH ĐỂ BÀN" />
                {tabletProduct?.length > 0 && <Slide data={tabletProduct} ItemSlide={Product} numberSlide={5} />}
            </div>
            <div>
                <GenerralProductHeader />
                <div className=" grid grid-cols-10 gap-2 ">
                    {
                        devicesData?.length > 0 && devicesData.map((product: DevicesType.DevicesType, index) => (
                            <GeneralProduct key={index} data={product} />
                        ))
                    }
                </div>
            </div>
            {/* <div>
                <Banner data={credit} heading="ƯU ĐÃI THANH TOÁN" />
            </div>
            <div>
                <Banner data={branch} heading="CHUYÊN TRANG THƯƠNG HIỆU" />
            </div> */}
        </div >
    );
}

export default Home;