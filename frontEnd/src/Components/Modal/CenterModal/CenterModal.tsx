interface CenterModalProps {
    data: React.ReactElement;
}
const CenterModal: React.FC<CenterModalProps> = ({ data }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-300 opacity-80">
            <div className="w-80 h-80 bg-white shadow-custom border">
                {data}
            </div>
        </div>
    );
};

export default CenterModal;
