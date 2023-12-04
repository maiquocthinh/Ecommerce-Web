import { checkoutProductType } from "@/common/Cart";
import CenterModal from "../Modal/CenterModal/CenterModal";
import { useState, useEffect } from "react";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useDispatch, useSelector } from "react-redux";
import { productVersion } from "@/common/product";
import { toast } from "react-toastify";
import { setComponentLevelLoading } from "@/app/Slices/common/componentLeveLoadingSlice";
import { Router, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import {
    CheckoutProduct,
    checkoutWidthproductWithAuthentication,
} from "@/app/action/checkout";
interface CheckoutWithProductProps {
    show: boolean;
    setShow: (show: boolean) => void;
    productVersion: productVersion;
}
const initFormData = {
    deliveryInfo: {
        recipientName: "",
        phoneNumber: "",
        email: "",
        specificAddress: "",
        province: "",
        districts: "",
        wards: "",
    },
    items: [
        {
            productVersionId: 0,
            quantity: 0,
        },
    ],
};
const CheckoutWithProduct: React.FC<CheckoutWithProductProps> = ({
    show,
    setShow,
    productVersion,
}) => {
    const route = useNavigate();
    const dispatch = useDispatch<any>();
    const [isCheckoutProduct, setIsCheckoutProduct] = useState<boolean>(false);
    const [formData, setFormData] = useState<checkoutProductType>(initFormData);
    const [numberProductbuy, setNumberProductbuy] = useState<number>(1);
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            deliveryInfo: {
                ...formData.deliveryInfo,
                [e.target.name]: e.target.value,
            },
        });
    };
    const handleCheckoutWithAuthen = () => {
        dispatch(setComponentLevelLoading({ loading: true, id: "" }));
        if (show && productVersion && numberProductbuy > 0) {
            dispatch(
                checkoutWidthproductWithAuthentication([
                    {
                        productVersionId: Number(productVersion.id),
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
                    setShow(false);
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
    const handleCheckOutWithProduct = async () => {
        dispatch(setComponentLevelLoading({ loading: true, id: "" }));
        if (
            productVersion &&
            numberProductbuy > 0 &&
            formData.deliveryInfo.email.trim() !== "" &&
            formData.deliveryInfo.phoneNumber.trim() !== "" &&
            formData.deliveryInfo.province.trim() !== "" &&
            formData.deliveryInfo.specificAddress.trim() !== "" &&
            formData.deliveryInfo.wards.trim() !== "" &&
            formData.deliveryInfo.districts.trim() !== "" &&
            formData.deliveryInfo.recipientName.trim() !== ""
        ) {
            const res = await dispatch(
                CheckoutProduct({
                    ...formData,
                    items: [
                        {
                            productVersionId: Number(productVersion.id),
                            quantity: numberProductbuy,
                        },
                    ],
                })
            );
            try {
                if (res.payload.success) {
                    setFormData(initFormData);
                    toast.success(
                        "bạn vừa đặt hàng thành công! vui lòng chờ trong giây phút để nhân viên liên lạc"
                    );
                    setIsCheckoutProduct(false);
                    setShow(false);
                } else {
                    toast.error(
                        "mua hàng thất bại, vui lòng kiểm tra lại đơn hàng"
                    );
                }
                dispatch(setComponentLevelLoading({ loading: false, id: "" }));
            } catch (error) {
                dispatch(setComponentLevelLoading({ loading: false, id: "" }));
                toast.error("lỗi hệ thống vui lòng chờ trong giây lát");
            }
        } else {
            toast.error("vui lòng nhập đầy đủ thông tin");
            dispatch(setComponentLevelLoading({ loading: false, id: "" }));
        }
    };
    return (
        <>
            <CenterModal
                show={show}
                setShow={setShow}
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
                            onClick={() => setShow(false)}
                        >
                            <AiOutlineClose size={22} />
                        </button>
                    </div>
                }
                buttonComponent={
                    <div className="flex justify-center w-full pt-2">
                        {!isLoggedIn ? (
                            <button
                                onClick={() => {
                                    setShow(false);
                                    setIsCheckoutProduct(true);
                                }}
                                className="mb-2 text-lg bg-custom-bg_button text-white p-2 rounded-md px-4 opacity-90 transition-all duration-150 hover:opacity-100"
                            >
                                {componentLoading.loading === true ? (
                                    <ComponentLevelLoader
                                        text={"đang tới nhập thông tin"}
                                        color={"red"}
                                        loading={componentLoading.loading}
                                    />
                                ) : (
                                    "nhập thông tin"
                                )}
                            </button>
                        ) : (
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
                        )}
                    </div>
                }
            />
            <CenterModal
                bgAll="bg-custom-addmin_bg"
                mainContent={
                    <div className="flex gap-4 justify-start items-start p-2">
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <p className="text-gray-300 text-sm text-start">
                                        email:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="email"
                                        value={formData.deliveryInfo.email}
                                        name="email"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập email"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        phoneNumber :
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={
                                            formData.deliveryInfo.phoneNumber
                                        }
                                        name="phoneNumber"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập phoneNumber"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <p className="text-gray-300 text-sm text-start">
                                        wards:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={formData.deliveryInfo.wards}
                                        name="wards"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập wards"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        province:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={formData.deliveryInfo.province}
                                        name="province"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập province"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <p className="text-gray-300 text-sm text-start">
                                        recipientName:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={
                                            formData.deliveryInfo.recipientName
                                        }
                                        name="recipientName"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập recipientName"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        districts:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={formData.deliveryInfo.districts}
                                        name="districts"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập districts"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        specificAddress:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={
                                            formData.deliveryInfo
                                                .specificAddress
                                        }
                                        name="specificAddress"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập specificAddress"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                show={isCheckoutProduct}
                setShow={setIsCheckoutProduct}
                showModalTitle
                modalTitle={
                    <h1 className="font-bold text-2xl text-white">
                        Nhập thông tin khách hàng
                    </h1>
                }
                showButtons
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2 pt-2">
                        <button
                            onClick={() => {
                                setShow(true);
                                setIsCheckoutProduct(false);
                            }}
                            className="px-4 py-2 border-b-4 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-200"
                        >
                            qua trở về
                        </button>
                        <button
                            onClick={handleCheckOutWithProduct}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            {componentLoading.loading === true ? (
                                <ComponentLevelLoader
                                    text={"đang mua hàng"}
                                    color={"green"}
                                    loading={componentLoading.loading}
                                />
                            ) : (
                                "mua hàng"
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setFormData(initFormData);
                                setShow(false);
                                setIsCheckoutProduct(false);
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            đóng
                        </button>
                    </div>
                }
            />
        </>
    );
};

export default CheckoutWithProduct;
