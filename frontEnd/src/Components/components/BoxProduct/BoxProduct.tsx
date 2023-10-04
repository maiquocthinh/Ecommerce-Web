import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import Img from "../../Img/Img";
import Tippy from "@tippyjs/react";
import { useState } from "react";
interface BoxProductProps {
    data: {
        title: string;
        price: string;
        src?: string;
    }[]
}
const BoxProduct: React.FC<BoxProductProps> = ({ data }) => {
    const [active, setActive] = useState(data[0].title)
    const handlerActive = (title: string) => {
        setActive(title)
    }
    return (
        <div className="grid grid-cols-12 gap-1">
            {data?.length > 0 && data?.map((item, index) => (
                <Tippy content={item.title} key={index} placement="right-end" delay={200}>
                    <div onClick={() => handlerActive(item.title)} className={`flex gap-2 mr-1 mt-1 items-center col-span-4 border-[1px] justify-center rounded-borderContnet h-auto cursor-pointer ${active === item.title ? "border-custom-primary relative" : ""}`}>
                        {item?.src &&
                            <img src={item.src} alt="" className="w-[30px] h-[30px]" />
                        }
                        <div className="flex flex-col gap-1 text-center p-2">
                            <span className="text-[12px] font-semibold">{item.title}</span>
                            <span className="text-[10px]">{item.price}đ</span>
                        </div>
                        {active && <div className="absolute top-0 left-0 bg-custom-primary rounded-br-borderContnet rounded-tl-borderContnet p-[1px]"><FaCheck className="text-sm text-white" /></div>}

                    </div>
                </Tippy>

            ))}
        </div>
    );
}

export default BoxProduct;