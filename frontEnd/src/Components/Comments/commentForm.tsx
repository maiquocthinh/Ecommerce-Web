import commentImg from "../../assets/imgs/chibi2.webp"
import { FaPaperPlane } from "@react-icons/all-files/fa/FaPaperPlane"
const CommentForm = () => {
    return (
        <div className="flex gap-2 items-start">
            <div className="shadow-custom  p-4 rounded-borderContnet flex gap-2 bg-white flex-1">
                <img src={commentImg} alt="" />
                <textarea placeholder="Vui lòng nhập nội dung bạn muốn bình luận" className="flex-1 outline-none ml-2" />
            </div>
            <button className="flex gap-1 px-4 py-2 bg-custom-bg_button rounded-borderContnet items-center text-white">
                <FaPaperPlane />
                <span>Gửi</span>
            </button>
        </div>
    );
}

export default CommentForm;