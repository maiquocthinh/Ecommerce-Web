import Slider from "react-slick";
import { useState, useRef, useEffect } from "react"
import NextBtn from "./NextBtn";
import PreBtn from "./PreBtn";
import { ProductType } from "../../common/product";
import { PosterType } from "../../common/Poster";

interface SlideProps {
    data: ProductType[] | PosterType[] | any;
    numberSlide?: number,
    ItemSlide: any,
    slideDescription?: boolean
}
const Slide: React.FC<SlideProps> = ({ data, numberSlide, ItemSlide, slideDescription }) => {
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
        speed: 200,
        slidesToShow: numberSlide || 1,
        slidesToScroll: 1,
        nextArrow: <NextBtn onClick={handleNextClick} />,
        prevArrow: <PreBtn onClick={handlePrevClick} />,
        autoplay: true,
        autoplaySpeed: 2000,
        afterChange: (index: number) => {
            setCurrentSlide(index);
        },
    };
    return (
        <div>
            <Slider {...settings} ref={sliderRef} className="group cursor-pointer">
                {data?.length > 0 && data.map((item: any, index: number) => (
                    <ItemSlide key={index} data={item} />
                ))}
            </Slider>
            {
                data?.length > 0 && slideDescription &&
                <div className="flex justify-between items-center">
                    {data.map((item: any, index: number) => {
                        if (item.title) {
                            return (
                                <span className={`w-full text-center py-4 cursor-pointer hover:bg-backgroundHover ${currentSlide === index ? "border-b-4 border-custom-primary transition-border hover:border-red-500" : ""}`} key={index}
                                    onClick={() => handleSetSlider(index)}>{item.title}</span>
                            )
                        }
                    }

                    )}
                </div>
            }
        </div>
    );
}

export default Slide;