import { FaComments } from "@react-icons/all-files/fa/FaComments";

interface UserCommentProps {

}
const UserComment: React.FC<UserCommentProps> = () => {
    return (
        <div className="relative shadow-custom flex items-center justify-between bg-white ml-8 p-4 rounded-borderContnet">
            <span>Ip11 64G pin 90% lên 14prm bù bao nhiêu ạ?</span>
            <button className="absolute right-2 bottom-1 flex items-center gap-1 text-custom-primary">
                <FaComments />
                <span>trả lời</span>
            </button>
        </div>
    );
}

export default UserComment;