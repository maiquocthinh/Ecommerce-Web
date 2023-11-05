import { productVersion } from "@/common/product";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import Tippy from "@tippyjs/react";
import { useState } from "react";
interface BoxProductProps {
    data: productVersion[];
    handleGetProductVersion: (id: number | string) => void;
}
const BoxProduct: React.FC<BoxProductProps> = ({
    data,
    handleGetProductVersion,
}) => {
    const [active, setActive] = useState<string | number>("");
    const handlerActive = (id: string | number) => {
        setActive(id);
        handleGetProductVersion(id);
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
                                    {item.name}
                                </span>
                                <span className="text-[10px]">
                                    {item.price}đ
                                </span>
                            </div>
                            {active && (
                                <div className="absolute top-0 left-0 bg-custom-primary rounded-br-borderContnet rounded-tl-borderContnet p-[1px]">
                                    <FaCheck className="text-sm text-white" />
                                </div>
                            )}
                        </div>
                    </Tippy>
                ))}
        </div>
    );
};

export default BoxProduct;
