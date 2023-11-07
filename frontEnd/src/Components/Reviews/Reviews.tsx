import CommentBox from "@/Components/Comments/commentBox";
import Star from "@/Components/commonListing/Star/Start";
import { getProfile } from "@/app/action/UserAction";
import { createReview, getAllReview } from "@/app/action/review";
import { ProductType, productVersion } from "@/common/product";
import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
interface ReviewProps {
    data: ProductType;
    productVersion: productVersion;
}
const Reviews: React.FC<ReviewProps> = ({ data, productVersion }) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch<any>();
    const createReviewData = useSelector(
        (state: any) => state.createReview.data
    );
    const profile = useSelector((state: any) => state.profile.data);
    const allReviewData = useSelector((state: any) => state.allReview.data);
    useEffect(() => {
        dispatch(getAllReview(Number(productVersion.id)));
        dispatch(getProfile());
    }, [dispatch, productVersion]);
    const handleCreateReview = () => {
        if (comment && comment.trim() !== "") {
            dispatch(
                createReview({
                    content: comment.trim(),
                    productVersionId: Number(productVersion?.id),
                    score: data.reviewsScore,
                })
            ).then((response: any) => {
                dispatch(getAllReview(Number(productVersion.id)));
            });
        }
    };
    console.log(profile);
    return (
        profile && (
            <>
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
                                        Math.floor(Number(data.reviewsScore)) |
                                        5
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
                <div className="flex gap-2 flex-col shadow-custom mt-4 rounded-borderContnet p-4 pb-20 bg-[#f9fafb]">
                    <h1 className="text-lg font-semibold">Bình luận</h1>
                    <div className="flex gap-2 items-start">
                        <div className="shadow-custom  p-4 rounded-borderContnet flex gap-2 bg-white flex-1">
                            <div className="flex gap-1">
                                <img
                                    src={profile.avatarUrl}
                                    alt=""
                                    className="w-12 h-12 rounded-full"
                                />
                                {/* <span className="text-sm font-medium">
                                    {`${profile.lastName} ${profile.firstName}`}
                                </span> */}
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                                placeholder="Vui lòng nhập nội dung bạn muốn bình luận"
                                className="flex-1 outline-none ml-2"
                            />
                        </div>
                        <button
                            onClick={handleCreateReview}
                            className="flex gap-1 px-4 py-2 bg-custom-bg_button rounded-borderContnet items-center text-white"
                        >
                            <FaPaperPlane />
                            <span>Gửi</span>
                        </button>
                    </div>
                    {allReviewData.reviews?.length ? <CommentBox /> : null}
                </div>
            </>
        )
    );
};

export default Reviews;
