import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { BsHeart } from "@react-icons/all-files/bs/BsHeart";
import { useEffect, useState } from "react";

interface DetailProductSlideProps {
    data: {
        src: string;
        title?: string;
    }
}
const DetailProductSlide: React.FC<DetailProductSlideProps> = ({ data }) => {
    return (
        <div className="overflow-hidden relative bg-white border-[1px] shadow-custom">
            {!data.title ?
                <div className="flex items-center gap-3 h-[400px]">
                    <img src={data.src} alt="" className="rounded-borderContnet object-cover w-full h-full shadow-custom" />
                </div>
                :
                <div className="flex items-center p-4 gap-3 rounded-borderContnet h-[400px] bg-[linear-gradient(90deg,#dd5e89,#f7bb97)]">
                    <img src={data.src} alt="" className="w-[250px] h-[250px] rounded-borderContnet object-cover shadow-custom" />

                    <div className="flex flex-col gap-2 text-white">
                        <span className="block text-center font-semibold text-2xl">Tính năng nỗi bật</span>
                        {data.title && <span>{data.title}</span>}
                    </div>
                </div>
            }
            <div className="absolute top-2 left-2">
                <button >
                    <FaHeart className="text-custom-primary" />
                </button>
                {/* <button >
                        <BsHeart className="text-custom-primary" />
                    </button> */}
            </div>
        </div>
    );
}
export default DetailProductSlide;