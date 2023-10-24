import { Link } from "react-router-dom";
import BackPage from "../backPage";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen mt-[-78px] ">
            <img src="https://cdn2.cellphones.com.vn/x,webp/media/cart/Cart-empty-v2.png" alt="" className="object-cover" />
            <div className="flex flex-col gap-2 text-center">
                <span>Giỏ hàng của bạn đang trống.</span>
                <span>Hãy chọn thêm sản phẩm để mua sắm nhé.</span>
            </div>
            <button className="py-2 px-4 rounded-borderContnet bg-custom-bg_button font-semibold text-xl text-white mt-4">
                <Link to="/">Let's shop</Link>
            </button>
        </div>
    );
}

export default EmptyCart;