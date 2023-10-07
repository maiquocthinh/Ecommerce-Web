import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";
import CartItem from "./cartItem";
import CartHeader from "./cartHeader";
import TotalPrice from "./totalPrice";
import BackPage from "./backPage";

interface CartProps {

}
const Cart: React.FC<CartProps> = () => {
    return (
        <div className="my-4 flex flex-col gap-2 border-[3px] border-black rounded-borderContnet">
            <div className="flex items-start gap-4">
                <BackPage />
                <div className="min-w-[60%] p-4">
                    <div className="flex justify-between items-center  ">
                        <span className="text-3xl font-bold font-serif text-black ">
                            giỏ hàng của bạn:
                        </span>
                        <div className="flex items-center gap-2 text-xl text-custom-primary">
                            <FaCartPlus />
                            <span>Emty cart</span>
                        </div>
                    </div>
                    <CartHeader />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
            </div>
            <TotalPrice />
        </div>
    );
}

export default Cart;