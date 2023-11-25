import { getBrandsByParams } from "@/app/action/adminAction/adminBrands";
import { getAllBrands } from "@/app/action/catalogs";
import { brandType } from "@/common/catalog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Action from "../Acction";
import Filter from "../Filter";
import Table from "../Table";
import { getCategoriesByParams } from "@/app/action/adminAction/adminCategories";

const Brands = () => {
    const dispatch = useDispatch<any>();
    const branchData = useSelector(
        (state: any) => state.branchData.data
    ) as brandType[];
    const adminCategoriesData = useSelector(
        (state: any) => state.adminCategoriesData.data
    );
    const [searchValue, setSearchValue] = useState<string>("");
    const handleSearchBrand = () => {
        if (searchValue.trim() !== "") {
            dispatch(getAllBrands(searchValue));
        }
    };
    useEffect(() => {
        dispatch(getCategoriesByParams({ pageIndex: 1, pageSize: 10 }));
    }, [dispatch]);
    console.log("adminCategoriesData", adminCategoriesData);
    return (
        branchData && (
            <div className="flex flex-col p-4">
                <Action />
                <Filter
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                    handleSearchBrand={handleSearchBrand}
                />
                <Table data={branchData} />
            </div>
        )
    );
};

export default Brands;
