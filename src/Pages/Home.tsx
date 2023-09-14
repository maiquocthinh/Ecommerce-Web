import Slide from "../Components/Slide/Slide";

interface HomeProps {

}
const Home: React.FC<HomeProps> = () => {
    const dataSlide = [
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/oppo-month-sliding-0109.png",
            title: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-realme%2011-009.jpg",
            title: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-normal-th9-tv-xiaomi-a.jpg",
            title: "hello"
        },
        {
            imgURL: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/tecno-thang-9-sliding-0097.png",
            title: "hello"
        }
    ]
    return (
        <div>
            <Slide data={dataSlide} />
        </div>);
}

export default Home;