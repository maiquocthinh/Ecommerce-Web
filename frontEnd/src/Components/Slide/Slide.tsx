import Slider from "react-slick";
import { useState, useRef, useEffect } from "react"
import NextBtn from "./NextBtn";
import PreBtn from "./PreBtn";

interface SlideProps {
    data: {}[];
    numberSlide?: number,
    ItemSlide: any,
}
const Slide: React.FC<SlideProps> = ({ data, numberSlide, ItemSlide }) => {
    const sliderRef = useRef<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
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
    const handleSetSlider = (index: number) => {
        sliderRef.current?.slickGoTo(index)
    }
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: numberSlide || 1,
        slidesToScroll: 1,
        nextArrow: <NextBtn onClick={handleNextClick} />,
        prevArrow: <PreBtn onClick={handlePrevClick} />,
        autoplay: true,
        autoplaySpeed: 5000,
        afterChange: (index: number) => {
            setCurrentSlide(index);
        },
    };
    return (
        <div className="">
            <Slider {...settings} ref={sliderRef} className="rounded-b-borderContnet group cursor-pointer">
                {data?.length > 0 && data.map((item, index) => (
                    <ItemSlide key={index} data={item} />
                ))}
            </Slider>
            {/* <div className="flex justify-between items-center">
                {data?.length > 0 && data.map((item, index) => {
                    if (item.title) {
                        return (
                            <span className={`w-full text-center py-4 cursor-pointer hover:bg-backgroundHover ${currentSlide === index ? "border-b-4 border-custom-primary transition-border hover:border-red-500" : ""}`} key={index}
                                onClick={() => handleSetSlider(index)}>{item.title}</span>
                        )
                    }
                }

                )}
            </div> */}
        </div>
    );
}

export default Slide;