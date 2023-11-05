import { CartType } from "@/common/Cart";
import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackPage from "./backPage";
import CartItem from "./cartItem";
import TotalPrice from "./totalPrice";
import { deleteCart, getAllCart } from "@/app/action/CartActon";
import { toast } from "react-toastify";
interface CartProps {}
const Cart: React.FC<CartProps> = () => {
    const [cartItems, setCartItems] = useState<CartType[]>();
    const [checkUpdate, setCheckUpdate] = useState<boolean>(false);
    const allCart = useSelector((sate: any) => sate.allCart.data);

    const dispatch = useDispatch<any>();
    useEffect(() => {
        const cartItemsLocal = localStorage.getItem("cart");
        if (typeof cartItemsLocal === "string" && allCart !== undefined) {
            setCartItems(JSON.parse(cartItemsLocal));
        } else {
            if (cartItems) {
                setCartItems(allCart?.items);
            }
        }
    }, [allCart]);
    useEffect(() => {
        if (checkUpdate) {
            dispatch(getAllCart());
            setCheckUpdate(false);
        }
    }, [dispatch, checkUpdate]);
    const updateCartProps = (checkUpdate: boolean) => {
        setCheckUpdate(checkUpdate);
    };
    const handleDeleteCartItem = (id: number | string) => {
        if (id) {
            dispatch(deleteCart(id)).then((response: any) => {
                if (response.payload.success) {
                    toast.success("xóa sản phẩm thành công");
                } else {
                    toast.error("xóa sản phẩm thất bài");
                }
                return dispatch(getAllCart());
            });
        }
    };
    return (
        <div className="my-4 flex flex-col gap-2 border-[3px] border-black rounded-borderContnet">
            <div className="flex items-start gap-4">
                <BackPage />
                <div className="flex-1 p-4">
                    <div className="flex justify-between items-center  ">
                        <span className="text-3xl font-bold font-serif text-black ">
                            giỏ hàng của bạn:
                        </span>
                        <div className="flex items-center gap-2 text-xl text-custom-primary">
                            <FaCartPlus />
                            <span>Emty cart</span>
                        </div>
                    </div>

                    <div className=" mt-4 flex justify-between items-center text-lg font-semibold text-[#767676] p-2 border-b">
                        <span className="flex-1">Sản phẩm</span>
                        <span className="w-1/5">Số lượng</span>
                        <span className="w-1/5 text-center">giá tiền</span>
                        <span className="w-1/5 text-end">xóa</span>
                    </div>

                    {cartItems?.map((item) => (
                        <CartItem
                            key={item.id}
                            data={item}
                            updateCartProps={updateCartProps}
                            handleDeleteCartItem={handleDeleteCartItem}
                        />
                    ))}
                </div>
            </div>
            {cartItems && cartItems?.length > 0 ? (
                <TotalPrice data={cartItems} />
            ) : null}
        </div>
    );
};

export default Cart;
