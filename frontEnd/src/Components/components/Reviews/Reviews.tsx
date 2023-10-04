import Rate from "./rate";
import RateDetail from "./rateDetail";
import YourRate from "./yourRate";

const Reviews = () => {
    return (
        <div className="shadow-custom p-2 mt-4 rounded-borderContnet">
            <h1 className="font-semibold text-lg">Đánh giá & nhận xét Xiaomi Redmi Note 12 8GB 128GB</h1>
            <div className="flex w-full mb-3">
                <Rate />
                <RateDetail />
            </div>
            <YourRate />
        </div>
    );
}

export default Reviews;