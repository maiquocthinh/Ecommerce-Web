interface SaleItemProps {
    title: string;
    active?: boolean;
    handleActiveSale: (title: string) => void;
}
const SaleItem: React.FC<SaleItemProps> = ({ title, active, handleActiveSale }) => {
    const handleActiveSaleChil = () => {
        handleActiveSale(title);
    }
    return (
        <button className={`px-2 py-1 rounded-border font-semibold ${active ? "bg-black text-white" : "bg-white  text-black"}`}
            onClick={handleActiveSaleChil}
        >{title}</button>
    );
}

export default SaleItem