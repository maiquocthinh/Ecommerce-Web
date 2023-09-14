import Slider from "react-slick";
import NextBtn from "./NextBtn";
import PreBtn from "./PreBtn";
import { useRef } from "react";

interface SlideProps {
    data: {
        imgURL: string,
        title: string
    }[];
}
const Slide: React.FC<SlideProps> = ({ data }) => {
    const sliderRef = useRef<Slider | null>(null);

    const handleNextClick = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handlePrevClick = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextBtn onClick={handleNextClick} />, // Thay thế NextArrowComponent bằng component thực tế của bạn
        prevArrow: <PreBtn onClick={handlePrevClick} />,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Slider {...settings} ref={sliderRef} className="overflow-hidden rounded-borderContnet group cursor-pointer">
            {data?.length > 0 && data.map((item, index) => (
                <div key={index} className="overflow-hidden">
                    <img src={item.imgURL} alt="slide" className="w-full h-80 object-cover rounded-borderContnet" />
                </div>
            ))}
        </Slider>
    );
}

export default Slide;