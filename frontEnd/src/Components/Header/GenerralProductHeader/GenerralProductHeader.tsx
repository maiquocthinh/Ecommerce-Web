interface GenerralProductHeaderProps {
    heading?: string,
}
const GenerralProductHeader: React.FC<GenerralProductHeaderProps> = ({ heading = "Linh kiện" }) => {
    return (
        <div className="flex justify-between items-center my-2">
            <h1 className="font-bold text-2xl">{heading}</h1>
            <button className="border-none hover:underline font-normal text-sm text-[#111]">xem thêm</button>
        </div>
    );
}

export default GenerralProductHeader;