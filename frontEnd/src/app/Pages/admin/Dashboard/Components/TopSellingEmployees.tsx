
import DropDownDateRange from "./DropDownDateRange"

const TopSellingEmployees = () => {
    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Top Selling Employees
                </h1>
                <div>
                    <DropDownDateRange />
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2 mb-2"></div>
            <div className="overflow-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">EMPLOYEE</td>
                            <td className="px-4 py-2">GENDER</td>
                            <td className="px-4 py-2">AMOUNT SOLD</td>
                            <td className="px-4 py-2">TOTAL VALUE</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-400">
                        {
                            [0, 0, 0, 0, 0, 0, 0].map((_, idx) =>
                            (<tr className="bg-custom-addmin_bg" key={idx}>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-md overflow-hidden h-9 w-9">
                                            <img src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg" />
                                        </div>
                                        <div className="text-sm">Alex Smith</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">Female</span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span className="text-sm font-semibold">44</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">67000000 VND</span>
                                </td>
                            </tr>)
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopSellingEmployees