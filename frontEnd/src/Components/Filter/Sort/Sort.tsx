import { FaLongArrowAltDown } from "@react-icons/all-files/fa/FaLongArrowAltDown";
import { FaLongArrowAltUp } from "@react-icons/all-files/fa/FaLongArrowAltUp";
import { FaPercentage } from "@react-icons/all-files/fa/FaPercentage";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
const Sort = () => {
    const select = [
        {
            icon: <FaLongArrowAltDown />,
            title: "giá cao - thấp",
        },
        {
            icon: <FaLongArrowAltUp />,
            title: "giá thấp - cao",
        },
        {
            icon: <FaPercentage />,
            title: "khuyến mãi",
        },
        {
            icon: <FaEye />,
            title: "xem nhiều",
        },
    ];
    return (
        <div className="mt-4">
            <span className="mb-2 block font-medium text-lg ">
                Xắp xếp theo
            </span>
            <div className=" flex gap-2  flex-wrap  items-center">
                {select?.length > 0 &&
                    select.map((data, index) => (
                        <div
                            key={index}
                            className="flex items-center p-2 border-[1px] cursor-pointer rounded-borderContnet text-[#444444] bg-[#f3f4f6] hover:text-custom-primary hover:border-custom-primary"
                        >
                            {data.icon}
                            <span className="ml-1 text-sm font-normal ">
                                {data.title}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Sort;
