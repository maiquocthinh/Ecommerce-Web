import { CartType } from "@/common/Cart";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
import { useNavigate } from "react-router-dom";
interface TotalPriceProps {
    data: CartType[];
}
const TotalPrice: React.FC<TotalPriceProps> = ({ data }) => {
    let totalPrice = 0;
    data.forEach((price) => {
        totalPrice += Number(price.prices.price) * Number(price.quantity);
    });
    const route = useNavigate();
    return (
        <div className="sticky bottom-0 left-0 right-0 z-10 border-t w-full p-4 bg-white bg-opacity-90 rounded-borderContnet flex justify-between items-center">
            <div>
                <div className="flex gap-2 items-center">
                    <span>Tổng tiền các sản phẩm :</span>
                    <span className="text-2xl font-medium">{totalPrice}đ</span>
                </div>
            </div>
            <button
                onClick={() => route("/checkout")}
                className="flex items-center gap-1 bg-custom-bg_button py-2 px-4 rounded-borderContnet text-white text-xl font-semibold"
            >
                <span className="">Thanh toán</span>
                <FaChevronRight />
            </button>
        </div>
    );
};

export default TotalPrice;
