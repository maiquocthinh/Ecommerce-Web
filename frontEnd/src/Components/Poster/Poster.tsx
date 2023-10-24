interface PosterProps {
    data: {
        src: string;
    }
}
const Poster: React.FC<PosterProps> = ({ data }) => {
    return (
        <div className="overflow-hidden">
            <img src={data.src} alt="slide" className="w-full h-80 object-cover rounded-t-borderContnet" />
        </div>
    );
}

export default Poster;