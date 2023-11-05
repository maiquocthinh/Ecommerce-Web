import { updateCart } from "@/app/action/CartActon";
import { CartType } from "@/common/Cart";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
interface CartItemProps {
    data: CartType;
    updateCartProps: (check: boolean) => void;
    handleDeleteCartItem: (id: number | string) => void;
}
const CartItem: React.FC<CartItemProps> = ({
    data,
    updateCartProps,
    handleDeleteCartItem,
}) => {
    const [quantity, setQuantity] = useState(data.quantity);
    const dispatch = useDispatch<any>();
    const handleUpdateCart = (value: string | number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const newQuantity = value;
        if (newQuantity !== data.quantity) {
            dispatch(updateCart({ quantity: newQuantity, id: data.id })).then(
                () => updateCartProps(true)
            );
        }
    };
    const handleChangeQuantity = (value: number | string) => {
        setQuantity(value);
        handleUpdateCart(value);
    };

    return (
        <div className="mt-2 py-4 flex items-center justify-between  border-b last:border-none relative">
            <div className="flex-1 flex items-center gap-2">
                <img
                    src={data.image}
                    alt=""
                    width={100}
                    height={100}
                    className="p-2 border rounded-borderContnet object-cover"
                />
                <div className="flex flex-col items-start">
                    <span className="text-xl font-medium">{data.name}</span>
                    <span>{data.color}</span>
                </div>
            </div>
            <div className="w-1/5 flex items-center gap-1">
                <button
                    disabled={Number(quantity) === 1}
                    className="disabled:text-custom-disable"
                    onClick={() => {
                        handleChangeQuantity(Number(quantity) - 1);
                    }}
                >
                    <FaChevronLeft />
                </button>
                <input
                    className="px-2 py-1 border border-black w-1/4 text-center"
                    value={quantity}
                    name="quantity"
                    onChange={(e) => handleChangeQuantity(e.target.value)}
                />
                <button
                    onClick={() => handleChangeQuantity(Number(quantity) + 1)}
                >
                    <FaChevronRight />
                </button>
            </div>
            <div className="w-1/5 text-center">
                <span>
                    {Number(data.prices.price) * Number(data.quantity)}đ
                </span>
            </div>
            <Tippy content="xóa" placement="bottom" className=" text-red-500">
                <button
                    onClick={() => handleDeleteCartItem(data.id)}
                    className="text-end text-red-500"
                >
                    <AiOutlineDelete size={20} />
                </button>
            </Tippy>
        </div>
    );
};

export default CartItem;
