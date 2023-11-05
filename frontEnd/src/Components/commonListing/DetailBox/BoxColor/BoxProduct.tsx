import { productVersion } from "@/common/product";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import Tippy from "@tippyjs/react";
import { useState } from "react";
interface BoxColorProps {
    data: productVersion[];
}
const BoxColor: React.FC<BoxColorProps> = ({ data }) => {
    const [active, setActive] = useState(data[0].id);
    const handlerActive = (id: string | number) => {
        setActive(id);
    };
    return (
        <div className="flex gap-2">
            {data?.length > 0 &&
                data?.map((item, index) => (
                    <Tippy
                        content={item.name}
                        key={index}
                        placement="right-end"
                        delay={200}
                    >
                        <div
                            onClick={() => handlerActive(item.id)}
                            className={`relative p-2 flex gap-2 mr-1 mt-1 items-center  border-[1px] justify-center rounded-borderContnet h-auto cursor-pointer ${
                                active === item.id
                                    ? "border-custom-primary relative"
                                    : ""
                            }  ${
                                item.isOutOfStock
                                    ? "pointer-events-none border-x-custom-disable"
                                    : null
                            }`}
                        >
                            {item?.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    alt=""
                                    className="w-[30px] h-[30px]"
                                />
                            )}
                            <div className="flex flex-col gap-1 text-center p-2">
                                <span className="text-[12px] font-semibold">
                                    {item.color}
                                </span>
                            </div>
                            {active && (
                                <div className="absolute top-0 left-0 bg-custom-primary rounded-br-borderContnet rounded-tl-borderContnet p-[1px]">
                                    <FaCheck className="text-sm text-white" />
                                </div>
                            )}
                            {item.isOutOfStock && (
                                <div className="absolute right-1 -top-8">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-a8235.appspot.com/o/ecommerce%2Fpng.monster-215.png-1699048341080-7jqemfvq97?alt=media&token=931e1bb1-456f-4f4d-88a1-c16f64373eb1"
                                        alt=""
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </Tippy>
                ))}
        </div>
    );
};

export default BoxColor;
