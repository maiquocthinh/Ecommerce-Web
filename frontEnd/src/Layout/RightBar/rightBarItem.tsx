interface RightBarItemProps {
    img: {
        src: string;
        alt: string;
    }
}
const RightBarItem: React.FC<RightBarItemProps> = ({ img }) => {
    return (
        <img src={img.src} alt={img.alt} className="object-cover rounded-borderContnet h-1/3 cursor-pointer" />
    );
}

export default RightBarItem;