import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react"
import { selectShowModal, openModal, closeModal } from "../../Components/ModalMenu/modalSlice";
interface SideBarItemProps {
    data: {
        icon: React.ReactElement,
        title: string,
    }
    index: number;
}
const SideBarItem: React.FC<SideBarItemProps> = ({ data, index }) => {
    const dispatch = useDispatch();
    const showModal = useSelector(selectShowModal);
    const handleShowModal = () => {
        !showModal ? dispatch(openModal()) : dispatch(closeModal());
    }
    return (
        <div className="flex justify-between items-center p-2 cursor-pointer" onMouseEnter={handleShowModal}>
            <div className="flex text-xs font-semibold">
                {data.icon}
                <span className="ml-3">{data.title}</span>
            </div>
            <div>
                <FaChevronRight className="font-light" />
            </div>
        </div>
    );
}

export default SideBarItem;