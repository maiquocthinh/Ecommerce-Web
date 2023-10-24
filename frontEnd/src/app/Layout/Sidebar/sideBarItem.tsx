import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react"
import { selectShowModal, openModal, closeModal } from "../../../Components/commonListing/ModalMenu/modalSlice";
import { Link } from "react-router-dom";
interface SideBarItemProps {
    data: {
        icon: React.ReactElement,
        title: string,
        link: string;
    }
}
const SideBarItem: React.FC<SideBarItemProps> = ({ data }) => {
    const dispatch = useDispatch();
    const showModal = useSelector(selectShowModal);
    const handleShowModal = () => {
        !showModal ? dispatch(openModal()) : dispatch(closeModal());
    }
    return (
        <Link to={`/${data.link}`} className="hover:text-custom-primary" >
            <div className="flex justify-between items-center p-2 cursor-pointer" onMouseUp={handleShowModal}>
                <div className="flex text-[14px] font-semibold">
                    <button className="block">{data.icon}</button>
                    <span className="ml-3">{data.title}</span>
                </div>
                <FaChevronRight />
            </div>
        </Link>
    );
}

export default SideBarItem;