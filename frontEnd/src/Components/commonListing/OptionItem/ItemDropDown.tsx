import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";

interface ItemDropDownProps {
    title: string;
}
const ItemDropDown: React.FC<ItemDropDownProps> = ({ title }) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)
    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown)
        setActive(!active)
    }
    return (
        <div className="relative" onClick={handleShowDropdown}>
            <div className={`flex items-center p-2 border-[1px] cursor-pointer rounded-borderContnet text-[#444444] bg-[#f3f4f6] ${active ? "border-custom-primary text-custom-primary" : ""}`}>
                <span className="mr-1 text-sm font-normal">{title}</span>
                <FaChevronDown />
            </div>
            <Dropdown showDropdown={showDropdown} />
        </div >
    );
}

export default ItemDropDown;