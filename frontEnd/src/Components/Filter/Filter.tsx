import { FaFilter } from "@react-icons/all-files/fa/FaFilter";
import { FaTruckMoving } from "@react-icons/all-files/fa/FaTruckMoving";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import ItemIcon from "../components/OptionItem/ItemIcon";
import ItemDropDown from "../components/OptionItem/ItemDropDown";

const Filter = () => {
    const select = [
        {
            icon: <FaFilter />,
            title: "bộ lọc"
        },
        {
            icon: <FaTruckMoving />,
            title: "sẳn hàng"
        },
        {
            icon: < FaDollarSign />,
            title: "giá"
        }
    ]
    const option = [
        {
            title: "Nhu cầu sử dụng"
        },
        {
            title: "Loại điện thoại"
        },
        {
            title: "Bộ nhớ trong"
        },
        {
            title: "Dung lượng RAM"
        },
        {
            title: "Tính năng đặc biệt"
        },
        {
            title: "Tính năng camera"
        },
        {
            title: 'Tần số quét'
        },
        {
            title: "Kích thước màn hình"
        },
        {
            title: "Kiểu màn hình"
        },
        {
            title: "Chip xử lí"
        }
    ]
    return (
        <div className="mt-4">
            <span className="mb-2 block font-medium text-lg ">chọn theo tiêu chí</span>
            <div className=" flex gap-2  flex-wrap  items-center">
                {select?.length > 0 && select.map((item, index) => (
                    <ItemIcon data={item} key={index} />
                ))}
                {
                    option?.length > 0 && option.map((item, index) => (
                        <ItemDropDown title={item.title} key={index} />
                    ))
                }
            </div>
        </div>
    );
}

export default Filter;