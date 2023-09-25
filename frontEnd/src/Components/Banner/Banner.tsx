import Img from "../Img/Img";

interface Bannerprops {
    data: {
        src: string;
    }[];
    heading: string;
    more?: boolean
}
const Banner: React.FC<Bannerprops> = ({ data, heading, more }) => {
    return (
        <div>
            <div className="flex justify-between items-center my-2">
                <span className="font-bold text-xl">{heading}</span>
                {more && <button className="border-none">Xem thêm</button>}
            </div>
            <div className="grid grid-cols-12 gap-2 ">
                {
                    data?.length > 0 && data.map((item, index) => (
                        <div className="md:col-span-3 col-span-6 " key={index}>
                            <Img src={item.src} />
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default Banner;