import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";

const Pay = () => {
    return (
        <div className="flex gap-2 items-center text-center mt-4">
            <button className="flex-1 bg-custom-primary py-2 rounded-borderContnet text-white text-xl font-bold cursor-pointer">Mua ngay</button>
            <div className="flex flex-col gap-1 items-center text-custom-primary px-2 py-2 border-[1px] border-custom-primary rounded-borderContnet cursor-pointer">
                <FaCartPlus />
                <span className="text-[8px] text-center font-bold">Thêm vào giỏ (+)</span>
            </div>
        </div>
    );
}

export default Pay;