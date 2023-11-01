import { FaHeart } from "@react-icons/all-files/fa/FaHeart"
import { BsHeart } from "@react-icons/all-files/bs/BsHeart"
import { useState } from "react"
import { Link } from "react-router-dom";
import { ProductType } from "../../common/product";
interface ProductProps {
    data: ProductType,
    col?: number;
    link?: string;
}
const Product: React.FC<ProductProps> = ({ data, col = 2 }) => {
    const [isLike, setIsLike] = useState(false)
    const handleLike = () => {
        setIsLike(!isLike)
    }
    return (
        <div className={`shadow-custom relative font-bold bg-white rounded-borderContnet mx-1 flex flex-col p-2  col-span-${col} cursor-pointer`}>
            <Link to={`/product/${data.id}`} className="flex flex-col">
                <div className="center">
                    <img src={data.src} alt="" width={160} className="mt-3" />
                </div>
                <div className="my-2 text-custom-colorProduct h-16">
                    <span>{data.name}</span>
                </div>
                <div className="flex justify-start gap-4 my-4">
                    {data?.sale && <span className="font-bold text-custom-primary">{Math.floor((data.price) * (data.sale))}đ</span>}
                    <span className="font-bold" style={{ color: data.sale ? "#707070" : "#d70018", textDecorationLine: data.sale ? "line-through" : "none" }}>{data.price}đ</span>
                </div>
                {
                    data.sale && (
                        <div className="absolute top-0 -left-1 bg_img ">
                            <span className="text-white text-xs font-semibold mb-2 block w-80 h-full pl-1 py-2">Giảm {data.sale * 100}%</span>
                        </div>
                    )
                }
            </Link>
            <div className="flex items-center justify-end gap-2 font-normal mt-1">
                <span className="text-custom-disable text-xs">Yêu thích</span>
                {isLike ?
                    <button onClick={handleLike} >
                        <FaHeart className="text-custom-primary" />
                    </button>
                    :
                    <button onClick={handleLike} >
                        <BsHeart className="text-custom-primary" />
                    </button>
                }
            </div>

        </div>
    );
}

export default Product;