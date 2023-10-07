import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
import { BsXCircle } from "@react-icons/all-files/bs/BsXCircle"


const CartItem = () => {
    return (
        <div className="mt-2 pb-2 flex items-center justify-between gap-2 border-b last:border-none relative">
            <div className="flex items-center gap-2">
                <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__5.jpg" alt="" width={100} height={100} className="p-2 border rounded-borderContnet object-cover" />
                <div className="flex flex-col items-start">
                    <span className="text-xl font-medium">
                        name
                    </span>
                    <span>
                        Thuộc tính màu ,...
                    </span>
                    <span>
                        Mô tả ,...
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button disabled className="text-custom-disable" ><FaChevronLeft /></button>
                <span className="px-2 py-1 border border-black">x1</span>
                <button><FaChevronRight /></button>
            </div>
            <div>
                <span>1000$</span>
            </div>
            <div className="absolute top-0 right-0 text-custom-primary">
                <button><BsXCircle /></button>
            </div>
        </div >
    );
}

export default CartItem;