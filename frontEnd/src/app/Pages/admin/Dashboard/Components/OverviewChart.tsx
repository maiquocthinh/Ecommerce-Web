
import DateRangeDropdown, { DateRangeType } from "./DropDownDateRange";
import DropDown from "./DropDown";
import React, { useState } from "react";
import ComposedChartWith3Axis from "../Graph/ComposedChartWith3Axis";
import StackedBarChart from "../Graph/StackedBarChart";
import DoubleBarChart from "../Graph/DoubleBarChart";


const OverviewChart = () => {

    const options = ['Overview', 'Orders', 'Revenue & Profit']
    const data0 = [
        {
            at: 'Mon',
            orders: 59,
            revenue: 800,
            profit: 1400,
        },
        {
            at: 'Tue',
            orders: 86,
            revenue: 967,
            profit: 1506,
        },
        {
            at: 'Wed',
            orders: 139,
            revenue: 1098,
            profit: 989,
        },
        {
            at: 'Thur',
            orders: 140,
            revenue: 1200,
            profit: 1228,
        },
        {
            at: 'Fri',
            orders: 150,
            revenue: 1108,
            profit: 1100,
        },
        {
            at: 'Sta',
            orders: 100,
            revenue: 680,
            profit: 1700,
        },
    ]
    const data1 = [
        {
            at: '2015.01',
            processing: 4000,
            delivering: 2400,
            shipped: 2400,
            cancelled: 2600,
        },
        {
            at: '2015.02',
            processing: 3000,
            delivering: 1398,
            shipped: 2210,
            cancelled: 2010,
        },
        {
            at: '2015.03',
            processing: 2000,
            delivering: 9800,
            shipped: 2290,
            cancelled: 2490,
        },
        {
            at: '2015.04',
            processing: 2780,
            delivering: 3908,
            shipped: 2000,
            cancelled: 2060,
        },

    ]
    const data2 = [
        {
            at: 'Sun',
            revenue: 4000,
            profit: 2400,
        },
        {
            at: 'Mon',
            revenue: 3000,
            profit: 1398,
        },
        {
            at: 'Tue',
            revenue: 2000,
            profit: 9800,
        },
        {
            at: 'Wed',
            revenue: 2780,
            profit: 3908,
        },
        {
            at: 'Thu',
            revenue: 1890,
            profit: 4800,
        },
        {
            at: 'Fri',
            revenue: 2390,
            profit: 3800,
        },
        {
            at: 'Sat',
            revenue: 3490,
            profit: 4300,
        },
    ];


    const [activeCatalog, setActiveCatalog] = useState<string | null>(options[0])
    const [dateRange, setDateRange] = useState<DateRangeType | null>(null)
    const [data, setData] = useState<any[]>(data0);

    const handleDropdownChange = (selectedOption: string | null): void => {
        setActiveCatalog(selectedOption)

        switch (selectedOption) {
            case 'Overview':
                setData(data0)
                break;
            case 'Orders':
                setData(data1)
                break;
            case 'Revenue & Profit':
                setData(data2)
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


    const renderChart = (): (React.ReactElement | null) => {
        switch (activeCatalog) {
            case 'Overview':
                return <ComposedChartWith3Axis data={data} />
            case 'Orders':
                return <StackedBarChart data={data} />
            case 'Revenue & Profit':
                return <DoubleBarChart data={data} />
        }

        return null
    }

    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Charts
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
                {renderChart()}
            </div>
        </div>
    )
}

export default OverviewChart