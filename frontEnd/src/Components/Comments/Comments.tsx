import CommentBox from "./commentBox";
import CommentForm from "./commentForm";

interface CommentsProps {

}
const Comments: React.FC<CommentsProps> = () => {
    return (
        <div className="flex gap-2 flex-col shadow-custom mt-4 rounded-borderContnet p-4 pb-20 bg-[#f9fafb]">
            <h1 className="text-lg font-semibold">Bình luận</h1>
            <CommentForm />
            <CommentBox />
        </div>
    );
}

export default Comments;