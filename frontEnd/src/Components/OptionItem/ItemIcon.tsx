import { FaFilter } from "@react-icons/all-files/fa/FaFilter"
interface ItemIconProps {
    data: {
        icon: React.ReactElement,
        title: string
    }
}
const ItemIcon: React.FC<ItemIconProps> = ({ data }) => {
    return (
        <div className="flex items-center p-2 border-[1px] cursor-pointer rounded-borderContnet text-[#444444] bg-[#f3f4f6] hover:text-custom-primary hover:border-custom-primary">
            {data.icon}
            <span className="ml-1 text-sm font-normal ">{data.title}</span>
        </div>
    );
}

export default ItemIcon;