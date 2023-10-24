import { FaStar } from "@react-icons/all-files/fa/FaStar";
import Star from "../Star/Start";

interface RateProps {

}
const Rate: React.FC<RateProps> = () => {
    return (
        <div className="flex items-center w-[40%]">
            <div className="flex flex-col items-center text-center  border-r-[1px] min-h-[200px] w-full justify-center">
                <span className="text-xl font-bold">
                    {`4.8/5`}
                </span>
                <Star numberStar={5} />
            </div>
        </div>
    );
}

export default Rate;