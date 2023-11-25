import { categoryType } from "@/common/catalog";
import { useSelector } from "react-redux";
import Action from "../Acction";
import Filter from "../Filter";
import Table from "../Table";

const Categories = () => {
    const categoriesData = useSelector(
        (state: any) => state.categoriesData.data as categoryType[]
    );
    return (
        categoriesData.length && (
            <div className="flex flex-col p-4">
                <Action />
                <Filter />
                <Table data={categoriesData} />
            </div>
        )
    );
};

export default Categories;
