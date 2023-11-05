import Star from "@/Components/commonListing/Star/Start";
import { ProductType } from "@/common/product";
interface ReviewProps {
    data: ProductType;
}
const Reviews: React.FC<ReviewProps> = ({ data }) => {
    return (
        <div className="shadow-custom p-2 mt-4 rounded-borderContnet">
            <h1 className="font-semibold text-lg">{data.name}</h1>
            <div className="flex w-full mb-3">
                <div className="flex items-center justify-center w-full">
                    <div className="felx-1 flex  flex-col items-center text-center  border-r-[1px] min-h-[200px] w-full justify-center">
                        <span className="text-xl font-bold">
                            {!data.reviewsScore
                                ? "5 / 5"
                                : `${data.reviewsScore} / 5`}
                        </span>
                        <Star
                            numberStar={
                                Math.floor(Number(data.reviewsScore)) | 5
                            }
                        />
                    </div>
                </div>
                {/* <div className="w-[60%] flex flex-col gap-2 items-center">
                    <div className="flex gap-1 items-center">
                        <label
                            htmlFor="file"
                            className="text-[#f59e0b] flex gap-1 items-center"
                        >
                            <FaStar />
                        </label>
                        <progress
                            id="file"
                            max="100"
                            value="70"
                            className="h-[8px] min-w-[260px]"
                        />
                    </div>
                </div> */}
            </div>
            <div className="flex flex-col items-center gap-2 border-t py-6 mb-4">
                <h1 className="text-center font-bold text-lg">
                    Bạn đánh giá sản phẩm này như thế nào ?{" "}
                </h1>
                <button className="bg-custom-bg_button text-white px-3 py-2 rounded-borderContnet cursor-pointer max-w-[50%]">
                    đánh giá ngay
                </button>
            </div>
        </div>
    );
};

export default Reviews;
