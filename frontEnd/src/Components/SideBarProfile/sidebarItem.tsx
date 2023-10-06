import { FaHouseDamage } from "@react-icons/all-files/fa/FaHouseDamage"
interface SidebarItemProps {
    icon: React.ReactElement;
    title: string
}
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title }) => {
    return (
        <div className="p-2 gap-2 flex items-center cursor-pointer hover:text-custom-primary border-transparent text-[#4a4a4a] text-xl border hover:border-custom-primary rounded-borderContnet hover:bg-custom-primary hover:bg-opacity-[.1]" >
            {icon}
            <span className="text-[16px]">{title}</span>
        </div>
    );
}

export default SidebarItem;