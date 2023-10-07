import { FaArrowCircleLeft } from "@react-icons/all-files/fa/FaArrowCircleLeft";
import { Link } from "react-router-dom";

const BackPage = () => {
    return (
        <Link to="/" className="flex items-center gap-1 cursor-pointer text-custom-primary font-medium text-lg p-2 mr-12 m-4 border-b border-custom-primary">
            <FaArrowCircleLeft />
            <span>quay về trang chủ</span>
        </Link>)
        ;
}

export default BackPage;