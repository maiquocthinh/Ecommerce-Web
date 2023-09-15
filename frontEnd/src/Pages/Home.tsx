import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import Slide from "../Components/Slide/Slide";
import ModalMenu from "../Components/ModalMenu/ModalMenu";
import RightBar from "../Layout/RightBar/RightBar";
import { selectShowModal } from "../Components/ModalMenu/modalSlice";
interface HomeProps {

}
const Home: React.FC<HomeProps> = () => {
    const showModal = useSelector(selectShowModal);
    const dataSlide = [
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/oppo-month-sliding-0109.png",
            title: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-realme%2011-009.jpg",
            title: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-normal-th9-tv-xiaomi-a.jpg",
            title: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/tecno-thang-9-sliding-0097.png",
            title: "hello"
        }
    ]
    return (
        <div className="relative grid grid-cols-10 gap-4 grid-rows-1">
            <div className="shadow-custom rounded-borderContnet overflow-hidden col-span-7">
                <Slide data={dataSlide} />
            </div>
            <div className="col-span-3 hidden md:block">
                <RightBar />
            </div>
            {
                showModal && (
                    <div className="col-span-10 absolute z-20 left-modal left-0 right-0 bg-white">
                        <ModalMenu />
                    </div>
                )
            }
        </div>);
}

export default Home;