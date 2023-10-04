import { FaStar } from "@react-icons/all-files/fa/FaStar";

const RateDetail = () => {
    const stars = Array.from({ length: 5 });
    return (
        <div className="w-[60%] flex flex-col gap-2 items-center">
            {stars?.length > 0 && stars.map((_, index) => (
                <div key={index} className="flex gap-1 items-center">
                    <label htmlFor="file" className="text-[#f59e0b] flex gap-1 items-center">{index}<FaStar /></label>
                    <progress id="file" max="100" value="70" className="h-[8px] min-w-[260px]" />
                    <span className="text-xs">30 đánh giá</span>
                </div>
            ))
            }
        </div >
    );
}

export default RateDetail;