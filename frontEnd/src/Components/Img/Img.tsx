interface ImgProps {
    src: string;
}
const Img: React.FC<ImgProps> = ({ src }) => {
    return (<img src={src} alt="img" className="rounded-borderContnet object-cover w-full h-full shadow-custom " />);
}

export default Img;