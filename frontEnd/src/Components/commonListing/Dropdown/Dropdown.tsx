import { dataDropdown } from "../../../utils/Data";

interface DropdownProps {
    showDropdown: boolean
}
const Dropdown: React.FC<DropdownProps> = ({ showDropdown }) => {

    return (showDropdown &&
        <div className="transition-all p-2 rounded-borderContnet min-w-[300px] max-w-[500px] flex flex-row flex-wrap gap-2 items-center justify-start absolute bg-white shadow-custom">
            {dataDropdown?.length > 0 && dataDropdown.map((item, index) => (
                <div key={index} className="flex gap-2 cursor-pointer items-center px-2 py-1 bg-[#f3f4f6] rounded-borderContnet">
                    <span className="text-[#4a4a4a] font-normal text-sm]">{item.label}</span>
                </div>
            ))}
        </div>
    );
}

export default Dropdown;