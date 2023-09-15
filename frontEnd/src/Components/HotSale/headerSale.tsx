import { useState } from "react";
import SaleItem from "./saleItem";
import TimeSale from "./timeSale";

const HeaderSale = () => {
    const data = ["Điện thoại,TV", "Laptop,Phụ kiện IT", "Phụ kiện"]
    const [content, setContent] = useState(data[0])
    const handleActiveSale = (title: string) => {
        setContent(title)
    }
    return (
        <div className="flex justify-between text-center items-center">
            <div className="flex gap-3">
                {data?.length > 0 && data.map((title, index) => (
                    title === content ? <SaleItem key={index} title={title} handleActiveSale={handleActiveSale} active /> : <SaleItem key={index} title={title} handleActiveSale={handleActiveSale} />
                ))}
            </div>
            <div>
                <img src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Gif_hotsale_cu_i_tu_n_1.gif" alt="" className="object-cover max-w-md" />
            </div>
            <div>
                <TimeSale />
            </div>
        </div>
    );
}

export default HeaderSale;