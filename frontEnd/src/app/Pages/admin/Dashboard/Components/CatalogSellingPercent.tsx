import CustomActiveShapePieChart from "../Graph/CustomActiveShapePieChart"
import DateRangeDropdown, { DateRangeType } from "./DropDownDateRange";
import DropDown from "./DropDown";
import { useState } from "react";


const CatalogSellingPercent = () => {

    const options = ['Category', 'Brand', 'Need']

    const [activeCatalog, setActiveCatalog] = useState<string | null>(options[0])
    const [dateRange, setDateRange] = useState<DateRangeType | null>(null)
    const [data, setData] = useState([
        { name: 'Smart Phone', value: 400 },
        { name: 'Laptop', value: 300 },
    ]);


    const handleDropdownChange = (selectedOption: string | null): void => {
        console.log(dateRange)
        setActiveCatalog(selectedOption)

        switch (selectedOption) {
            case 'Category':
                setData(
                    [
                        { name: 'Smart Phone', value: 400 },
                        { name: 'Laptop', value: 300 },
                    ]
                )
                break;
            case 'Brand':
                setData(
                    [
                        { name: 'Samsung', value: 80 },
                        { name: 'OPPO', value: 40 },
                        { name: 'Lenovo', value: 60 },
                        { name: 'Apple', value: 32 },
                        { name: 'Dell', value: 44 },
                        { name: 'Other', value: 120 },
                    ]
                )
                break;
            case 'Need':
                setData(
                    [
                        { name: 'Văn Phòng', value: 10 },
                        { name: 'Gaming', value: 30 },
                        { name: 'Đồ Họa', value: 23 },
                        { name: 'Lập Trình', value: 8 },
                    ]
                )
                break;
        }
    }

    const handleDateRangeChange = (dateRange: DateRangeType): void => {
        console.log(dateRange)
        setDateRange(dateRange)

        switch (activeCatalog) {
            case 'Category':
                setData(
                    [
                        { name: 'Smart Phone', value: 400 },
                        { name: 'Laptop', value: 300 },
                    ]
                )
                break;
            case 'Brand':
                setData(
                    [
                        { name: 'Samsung', value: 80 },
                        { name: 'OPPO', value: 40 },
                        { name: 'Lenovo', value: 60 },
                        { name: 'Apple', value: 32 },
                        { name: 'Dell', value: 44 },
                        { name: 'Other', value: 120 },
                    ]
                )
                break;
            case 'Need':
                setData(
                    [
                        { name: 'Văn Phòng', value: 10 },
                        { name: 'Gaming', value: 30 },
                        { name: 'Đồ Họa', value: 23 },
                        { name: 'Lập Trình', value: 8 },
                    ]
                )
                break;
        }
    }

    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Sold Percent
                </h1>
                <div className="flex gap-2">
                    <DropDown
                        options={options}
                        defaultOption={options[0]}
                        isDisplaySelect={true}
                        onChange={handleDropdownChange}
                    />
                    <DateRangeDropdown
                        onChanged={handleDateRangeChange}
                    />
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2"></div>
            <div className="overflow-auto">
                <CustomActiveShapePieChart data={data} />
            </div>
        </div>
    )
}

export default CatalogSellingPercent