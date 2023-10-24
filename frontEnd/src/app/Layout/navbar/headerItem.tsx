import { Link, useNavigate } from "react-router-dom";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

interface HeaderItemProps {
    data: {
        Icon: React.ReactElement;
        title: string
        link?: string
    }
    borderRight?: boolean
}
const HeaderItem: React.FC<HeaderItemProps> = ({ data, borderRight }) => {
    const route = useNavigate()
    return (
        <div onClick={() => route(`/${data.link}`)} className={`cursor-pointer ${borderRight ? "first:border-r-[1px]  pr-2 h-full" : null}`}>
            <div className={`flex items - center cursor - pointer text - white hover: invert transition - all duration - 200 ease - linear`}>
                {data.Icon}
                <span className="ml-2 text-sm font-bold">{capitalizeFirstLetter(data.title)}</span>
            </div>
        </div >
    );
}

export default HeaderItem;