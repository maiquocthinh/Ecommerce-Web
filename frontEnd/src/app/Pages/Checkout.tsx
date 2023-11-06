import { useNavigate } from "react-router-dom";
import { GrDeliver } from "@react-icons/all-files/gr/GrDeliver";
import { useEffect, useState } from "react";
import { CartType } from "@/common/Cart";
import { AiOutlineCheck, AiOutlineCreditCard } from "react-icons/ai";
import { MdKeyboardArrowRight, MdOutlineAlternateEmail } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/Bi";
const Checkout = () => {
    const [cartItems, setCartItems] = useState<CartType[]>();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const route = useNavigate();
    useEffect(() => {
        const cartItemsLocal = localStorage.getItem("cart");
        if (typeof cartItemsLocal === "string") {
            setCartItems(JSON.parse(cartItemsLocal));
        }
    }, []);
    useEffect(() => {
        let subPrice = 0;
        if (cartItems) {
            cartItems.forEach((price) => {
                subPrice += Number(price.prices.price) * Number(price.quantity);
            });
        }
        setTotalPrice(subPrice);
    }, [cartItems]);
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
                                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
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
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Chi tiết thanh toán</p>
                    <p className="text-gray-400">
                        Hoàn tất đơn đặt hàng của bạn bằng cách cung cấp chi
                        tiết thanh toán của bạn.
                    </p>
                    <div className="">
                        <label
                            htmlFor="email"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="your.email@gmail.com"
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                        <label
                            htmlFor="card-holder"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Tên chủ thẻ
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="card-holder"
                                name="card-holder"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your full name here"
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <BiSolidUserDetail className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                        <label
                            htmlFor="card-no"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            chi tiêt thẻ
                        </label>
                        <div className="flex">
                            <div className="relative w-7/12 flex-shrink-0">
                                <input
                                    type="text"
                                    id="card-no"
                                    name="card-no"
                                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <AiOutlineCreditCard className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            <input
                                type="text"
                                name="credit-expiry"
                                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="MM/YY"
                            />
                            <input
                                type="text"
                                name="credit-cvc"
                                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="CVC"
                            />
                        </div>
                        <label
                            htmlFor="billing-address"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Địa chỉ thanh toán
                        </label>
                        <div className="flex flex-col sm:flex-row">
                            <div className="relative flex-shrink-0 sm:w-7/12">
                                <input
                                    type="text"
                                    id="billing-address"
                                    name="billing-address"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="địa chỉ nhà"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <img
                                        className="h-4 w-4 object-contain"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <select
                                name="billing-state"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="State">city</option>
                            </select>
                            <input
                                type="text"
                                name="billing-zip"
                                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="ZIP"
                            />
                        </div>

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
                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
