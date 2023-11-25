import { useSelector } from "react-redux";
import Action from "../Acction";
import Filter from "../Filter";
import Table from "../Table";
import { needType } from "@/common/catalog";

const Needs = () => {
    const needsData = useSelector(
        (state: any) => state.needsData.data as needType[]
    );
    return (
        needsData && (
            <div className="flex flex-col p-4">
                <Action />
                <Filter />
                <Table data={needsData} />
            </div>
        )
    );
};

export default Needs;
