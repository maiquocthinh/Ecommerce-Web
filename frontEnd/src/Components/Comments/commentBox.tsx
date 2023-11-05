import Account from "../commonListing/Account/Account";
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaComments } from "@react-icons/all-files/fa/FaComments";
import UserComment from "./userComment";
interface CommentBoxProps {}
const CommentBox: React.FC<CommentBoxProps> = ({}) => {
    return (
        <div>
            <div className="mt-2 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <Account
                        src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/269812011_1083046655869537_4870147934702657640_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=z2OBQZTFhA4AX-7DQ32&_nc_ht=scontent.fsgn8-4.fna&_nc_e2o=f&oh=00_AfABt2KL-H4vS1AcFIn-6fhUdD7P1GbzxNNJqtT5vTV3Lw&oe=65245720"
                        name="Minh Hoàng"
                    />
                    <div className="flex items-center gap-1 text-sm text-[#707070]">
                        <FaClock />
                        <span>
                            <time>1 </time>
                            ngày trước
                        </span>
                    </div>
                </div>
                <UserComment />
            </div>
            <div className="mt-2 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <Account
                        src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/269812011_1083046655869537_4870147934702657640_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=z2OBQZTFhA4AX-7DQ32&_nc_ht=scontent.fsgn8-4.fna&_nc_e2o=f&oh=00_AfABt2KL-H4vS1AcFIn-6fhUdD7P1GbzxNNJqtT5vTV3Lw&oe=65245720"
                        name="Minh Hoàng"
                    />
                    <div className="flex items-center gap-1 text-sm text-[#707070]">
                        <FaClock />
                        <span>
                            <time>1 </time>
                            ngày trước
                        </span>
                    </div>
                </div>
                <UserComment />
            </div>
            <div className="mt-2 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <Account
                        src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/269812011_1083046655869537_4870147934702657640_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=z2OBQZTFhA4AX-7DQ32&_nc_ht=scontent.fsgn8-4.fna&_nc_e2o=f&oh=00_AfABt2KL-H4vS1AcFIn-6fhUdD7P1GbzxNNJqtT5vTV3Lw&oe=65245720"
                        name="Minh Hoàng"
                    />
                    <div className="flex items-center gap-1 text-sm text-[#707070]">
                        <FaClock />
                        <span>
                            <time>1 </time>
                            ngày trước
                        </span>
                    </div>
                </div>
                <UserComment />
            </div>
        </div>
    );
};

export default CommentBox;
