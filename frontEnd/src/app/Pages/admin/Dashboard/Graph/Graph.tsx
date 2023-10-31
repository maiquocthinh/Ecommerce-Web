import SimpleLineChart from "./SimpleLineChart";
import SimplePieChart from "./SimplePieChart";

const Graph = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 my-2">
            <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">Weekly Sales</p>
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="mr-2">
                            <button type="button" className="inline-block p-2 rounded-t-lg border-b-2 border-transparent text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500  focus:outline-none">Sales</button>
                        </li>
                        <li className="mr-2">
                            <button type="button" className="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  focus:outline-none">Orders</button>
                        </li>
                    </ul>
                </div>
                <SimpleLineChart />
            </div>
            <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">Best Selling Products</p>
                <SimplePieChart />
            </div>
        </div>
    );
}

export default Graph;