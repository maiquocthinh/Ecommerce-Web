import { FaPhone } from "@react-icons/all-files/fa/faPhone";
import { FaShieldAlt } from "@react-icons/all-files/fa/FaShieldAlt";
import { FaPaypal } from "@react-icons/all-files/fa/FaPaypal";

const InfoProduct = () => {
    return (
        <div className="mt-4 p-2 border-[1px] rounded-borderContnet">
            <h1 className="text-center font-bold text-lg my-1">
                Thông Tin Sản Phẩm
            </h1>
            <div className="flex flex-col gap-2 ">
                <div className="flex gap-4 items-center text-[#4a4a4a] opacity-[.9] ">
                    <FaPhone />
                    <span className="text-sm font-medium">Mới, đầy đủ phụ kiện từ nhà sản xuất</span>
                </div>
                <div className="flex gap-4 items-center text-[#4a4a4a] opacity-[.9]">
                    <FaShieldAlt />
                    <span className="text-sm font-medium">Bảo hành 18 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất. (xem chi tiết)</span>
                </div>
                <div className="flex gap-4 items-center text-[#4a4a4a] opacity-[.9]">
                    <FaPaypal />
                    <span className="text-sm font-medium">Giá sản phẩm đã bao gồm VAT</span>
                </div>
            </div>
        </div>
    );
}

export default InfoProduct;