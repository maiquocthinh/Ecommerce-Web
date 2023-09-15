interface HeaderProductProps {
    heading: string,
    listProduct: string[]
}
const HeaderProduct: React.FC<HeaderProductProps> = ({ heading, listProduct }) => {
    return (
        <div className="flex justify-between items-center my-4">
            <h1 className="font-bold text-2xl">{heading}</h1>
            <div className="flex gap-2">
                {listProduct?.length > 0 && listProduct.map((product, index) => (
                    <button key={index} className="bg-backgroundHover py-1 px-3 rounded-border text-xs">{product}</button>
                ))}
            </div>
        </div>
    );
}

export default HeaderProduct;