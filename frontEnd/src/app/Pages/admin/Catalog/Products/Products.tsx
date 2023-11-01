import Action from "../Acction";
import Filter from "../Filter";
import Table from "../Table";

const Products = () => {
    return (
        <div className="flex flex-col p-4">
            <Action />
            <Filter />
            <Table />
        </div>
    );
};

export default Products;
