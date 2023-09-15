import RightBarItem from "./rightBarItem";

const RightBar = () => {
    const data = [
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/m14-right-homepage-th9.png",
            alt: "",
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/ipad-102-th9-001231.png",
            alt: "",
        },
        {
            src: "https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/asus%20tuf.jpg",
            alt: "",
        }
    ]
    return (
        <div className="flex flex-col gap-3">
            {data?.length > 0 && data.map((item, index) => (
                <RightBarItem img={item} key={index} />
            ))}
        </div>
    );
}

export default RightBar;