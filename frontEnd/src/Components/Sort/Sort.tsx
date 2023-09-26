;
import { FaLongArrowAltDown } from "@react-icons/all-files/fa/FaLongArrowAltDown"
import { FaLongArrowAltUp } from "@react-icons/all-files/fa/FaLongArrowAltUp"
import { FaPercentage } from "@react-icons/all-files/fa/FaPercentage"
import { FaEye } from "@react-icons/all-files/fa/FaEye"
import ItemIcon from "../OptionItem/ItemIcon";

const Sort = () => {
    const select = [
        {
            icon: <FaLongArrowAltDown />,
            title: "giá cao - thấp"
        },
        {
            icon: <FaLongArrowAltUp />,
            title: "giá thấp - cao"
        },
        {
            icon: < FaPercentage />,
            title: "khuyến mãi"
        },
        {
            icon: < FaEye />,
            title: "xem nhiều"
        }
    ]
    return (
        <div className="mt-4">
            <span className="mb-2 block font-medium text-lg ">Xắp xếp theo</span>
            <div className=" flex gap-2  flex-wrap  items-center">
                {select?.length > 0 && select.map((item, index) => (
                    <ItemIcon data={item} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Sort;