import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

interface HeaderItemProps {
    data: {
        Icon: React.ReactElement;
        title: string

    }
}
const HeaderItem: React.FC<HeaderItemProps> = ({ data }) => {
    return (
        <div className="flex items-center cursor-pointer text-white">
            {data.Icon}
            <span className="ml-2 text-sm font-medium">{capitalizeFirstLetter(data.title)}</span>
        </div>
    );
}

export default HeaderItem;