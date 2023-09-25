interface GeneralProductProps {
    data: {
        bg?: string;
        src: string;
        heading: string;
    };
    col?: number;
}
const GeneralProduct: React.FC<GeneralProductProps> = ({ col = 1, data }) => {
    return (
        <div className={`md:col-span-${col} sm:col-span-2 col-span-5`}>
            <div className={`min-h-[125px] bg-right-top bg-[${data.bg || `#f28376`}] bg-[url(https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg)] bg-[100% 100%] bg-contain bg-no-repeat p-1 rounded-borderContnet`}>
                <span className="text-md font-medium text-white block">{data.heading}</span>
            </div>
        </div >
    );
}

export default GeneralProduct;