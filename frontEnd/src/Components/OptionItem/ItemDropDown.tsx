import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"

interface ItemDropDownProps {
    title: string;
}
const ItemDropDown: React.FC<ItemDropDownProps> = ({ title }) => {
    return (
        <div>
            <div className="flex items-center p-2 border-[1px] cursor-pointer rounded-borderContnet text-[#444444] bg-[#f3f4f6]  hover:text-custom-primary hover:border-custom-primary">
                <span className="mr-1 text-sm font-normal">{title}</span>
                <FaChevronDown />
            </div>
        </div>
    );
}

export default ItemDropDown;