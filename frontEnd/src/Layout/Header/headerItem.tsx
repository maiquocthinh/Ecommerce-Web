import { Link } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

interface HeaderItemProps {
    data: {
        Icon: React.ReactElement;
        title: string
        link?: string
    }
}
const HeaderItem: React.FC<HeaderItemProps> = ({ data }) => {
    return (
        <Link to={`/${data.link || "/"}`}>
            <div className="flex items-center cursor-pointer text-white hover:invert transition-all duration-200 ease-linear">
                {data.Icon}
                <span className="ml-2 text-sm font-medium">{capitalizeFirstLetter(data.title)}</span>
            </div>
        </Link>
    );
}

export default HeaderItem;