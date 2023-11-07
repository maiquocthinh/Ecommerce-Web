import Notification from "@/Components/PageLoader/Notification";
import { CartType } from "@/common/Cart";
import { GrDeliver } from "@react-icons/all-files/gr/GrDeliver";
import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckOutWidthCart } from "../action/checkout";
import { getAllCart } from "../action/CartActon";
import { getAllAddresses } from "../action/address";
import { addressType } from "@/common/Address";
const Checkout = () => {
    const [cartItems, setCartItems] = useState<CartType[]>([]);
    const [addressDefault, setAddressDefault] = useState<addressType>();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const allAddresses = useSelector(
        (state: any) => state.allAddresses.data as addressType[]
    );
    const dispatch = useDispatch<any>();
    const route = useNavigate();
    useEffect(() => {
        const cartItemsLocal = localStorage.getItem("cart");
        if (typeof cartItemsLocal === "string") {
            setCartItems(JSON.parse(cartItemsLocal));
        }
        dispatch(getAllAddresses());
    }, [dispatch]);
    useEffect(() => {
        if (allAddresses) {
            const addressDefault = allAddresses.filter(
                (address) => address.isDefault
            );
            setAddressDefault(addressDefault[0]);
        }
    }, [allAddresses, addressDefault]);
    useEffect(() => {
        let subPrice = 0;
        if (cartItems) {
            cartItems.forEach((price) => {
                subPrice += Number(price.prices.price) * Number(price.quantity);
            });
        }
        setTotalPrice(subPrice);
    }, [cartItems]);
    const handleCheckout = () => {
        const listIdCart: number[] = [];
        cartItems.forEach((cartItem: CartType) => {
            listIdCart.push(Number(cartItem.id));
        });
        if (listIdCart.length > 0) {
            dispatch(CheckOutWidthCart(listIdCart)).then((response: any) => {
                if (response.payload.success) {
                    toast.success(
                        "đặt hàng thành công. chúc bạn có 1 trãi nghiệm tuyệt vời"
                    );
                    dispatch(getAllCart());
                    setTimeout(() => {
                        route("/profile/order");
                    }, 2000);
                } else {
                    toast.error(
                        "đặt hàng thất bại. vui lòng quay lại sau vài phút!"
                    );
                }
            });
        } else {
            toast.error("vui lòng chọn sản phẩm để đặt hàng");
        }
    };
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <button
                    onClick={() => route("/")}
                    className="text-2xl font-bold text-gray-800"
                >
                    E-commerce
                </button>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                                    <AiOutlineCheck className="h-4 w-4" />
                                </div>
                                <span className="font-semibold text-gray-900">
                                    Shop
                                </span>
                            </li>
                            <MdKeyboardArrowRight className="h-4 w-4 text-gray-400" />
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                                    2
                                </div>
                                <span className="font-semibold text-gray-900">
                                    Shipping
                                </span>
                            </li>
                            <MdKeyboardArrowRight className="h-4 w-4 text-gray-400" />
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                                    3
                                </div>
                                <span className="font-semibold text-gray-500">
                                    Payment
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">sản phẩm được chọn</p>
                    <p className="text-gray-400">
                        Kiểm tra các mục của bạn. Và lựa chọn phương thức vận
                        chuyển phù hợp.
                    </p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {cartItems?.length &&
                            cartItems.map((cart) => (
                                <div
                                    key={cart.id}
                                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                                >
                                    <img
                                        className="m-2 h-24 w-28 rounded-md border object-contain"
                                        src={cart.image}
                                        alt=""
                                    />
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold">
                                            {cart.name}
                                        </span>
                                        <span className="float-right text-gray-400">
                                            {cart.quantity}
                                        </span>
                                        <p className="text-lg font-bold">
                                            $
                                            {Number(cart.prices.price) *
                                                Number(cart.quantity)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {addressDefault && (
                        <div className="flex flex-col gap-2 text-lg font-normal text-slate-500 mt-2 p-2">
                            <h2 className="uppercase text-black font-medium">
                                địa chỉ nhận hàng
                            </h2>
                            <span>Phường : {addressDefault.wards}</span>
                            <span>huyện : {addressDefault.districts}</span>
                            <span>tỉnh : {addressDefault.province}</span>
                            <span>
                                địa chỉ cụ thể :{addressDefault.specificAddress}
                            </span>
                            <span>
                                số điện thoại: {addressDefault.phoneNumber}
                            </span>
                        </div>
                    )}
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <p className="mt-8 text-lg font-medium">
                                Phương thức vận chuyển
                            </p>
                            <form className="mt-5 grid gap-6">
                                <div className="relative">
                                    <input
                                        className="peer hidden"
                                        id="radio_1"
                                        type="radio"
                                        name="radio"
                                        checked
                                    />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label
                                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                        htmlFor="radio_1"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <GrDeliver className="text-2xl" />
                                            <div className="flex-1">
                                                <span className="mt-2 font-semibold">
                                                    Chuyển phát nhanh
                                                </span>
                                                <p className="text-slate-500 text-sm leading-6">
                                                    Giao hàng: 24h
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        className="peer hidden"
                                        id="radio_2"
                                        type="radio"
                                        name="radio"
                                        checked
                                    />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label
                                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                        htmlFor="radio_2"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <GrDeliver className="text-2xl" />
                                            <div className="flex-1">
                                                <span className="mt-2 font-semibold">
                                                    Giao hàng phổ thông
                                                </span>
                                                <p className="text-slate-500 text-sm leading-6">
                                                    Giao hàng: 4-6 ngày
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div>
                            <p className="text-xl font-medium">
                                Chi tiết thanh toán
                            </p>
                            <p className="text-gray-400">
                                Hoàn tất đơn đặt hàng của bạn bằng cách cung cấp
                                chi tiết thanh toán của bạn.
                            </p>
                        </div>
                        <div>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        tổng tiền
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {totalPrice}đ
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        Shipping
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        100000
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                    Total
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {totalPrice + 100000}đ
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
            <Notification />
        </div>
    );
};

export default Checkout;
