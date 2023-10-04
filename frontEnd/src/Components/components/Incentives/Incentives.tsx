import { FaCheck } from "@react-icons/all-files/fa/FaCheck";

interface IncentivesProps {

}
const Incentives: React.FC<IncentivesProps> = ({ }) => {
    return (
        <div className="mt-4">
            <header className="py-2 px-1 bg-[#d1d5db] rounded-t-borderContnet">Ưu đãi thêm</header>
            <div className="flex flex-col gap-2 border-[#d1d5db border-[1px] rounded-b-borderContnet">
                <div className=" flex gap-2 items-center p-2 ">
                    <FaCheck className="text-sm text-white bg-[#4caf50] rounded-full p-1" />
                    <span className="text-sm">
                        Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)
                    </span>
                </div>
                <div className=" flex gap-2 items-center p-2 ">
                    <FaCheck className="text-sm text-white bg-[#4caf50] rounded-full p-1" />
                    <span className="text-sm">
                        Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)
                    </span>
                </div>
                <div className=" flex gap-2 items-center p-2 ">
                    <FaCheck className="text-sm text-white bg-[#4caf50] rounded-full p-1" />
                    <span className="text-sm">
                        Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)
                    </span>
                </div>
                <div className=" flex gap-2 items-center p-2 ">
                    <FaCheck className="text-sm text-white bg-[#4caf50] rounded-full p-1" />
                    <span className="text-sm">
                        Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Incentives;