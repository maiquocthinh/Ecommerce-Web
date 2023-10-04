interface ImgProps {
    src: string;
    heightProps?: number;
    widthProps?: number;
}
const Img: React.FC<ImgProps> = ({ src, heightProps, widthProps }) => {
    return (<img src={src} alt="img" className="rounded-borderContnet object-cover w-full h-full shadow-custom " style={{ maxHeight: heightProps, maxWidth: widthProps }} />);
}

export default Img;