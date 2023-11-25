import React from "react";

interface FilterProps {
    setSearchValue: (value: string) => void;
    searchValue: string;
    handleSearch: () => void;
    handleReset: () => void;
}
const Filter: React.FC<FilterProps> = ({
    searchValue,
    setSearchValue,
    handleSearch,
    handleReset,
}) => {
    return (
        <div className="rounded-lg  min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
            <div className="p-4">
                <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                            type="search"
                            name="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search Product"
                        />
                        <button className="absolute right-0 top-0 mt-5 mr-1"></button>
                    </div>
                    {/* <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                            <option value="All">Category</option>
                            <option value="65401898e598c20009f936bb">
                                Category 7
                            </option>
                            <option value="653f7b1c21a5620008393b1b">
                                Fish
                            </option>
                            <option value="653f7af7513ff90008eded1d">
                                john
                            </option>
                            <option value="653f6fae5e31e5000899d0ed">
                                Burger
                            </option>
                            <option value="653f3866c27dab0008a080fb">
                                Cauliflower
                            </option>
                        </select>
                    </div>
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                            <option value="All">Price</option>
                            <option value="low">Low to High</option>
                            <option value="high">High to Low</option>
                            <option value="published">Published</option>
                            <option value="unPublished">Unpublished</option>
                            <option value="status-selling">
                                Status - Selling
                            </option>
                            <option value="status-out-of-stock">
                                {" "}
                                Status - Out of Stock
                            </option>
                            <option value="date-added-asc">
                                Date Added (Asc)
                            </option>
                            <option value="date-added-desc">
                                Date Added (Desc)
                            </option>
                            <option value="date-updated-asc">
                                Date Updated (Asc)
                            </option>
                            <option value="date-updated-desc">
                                Date Updated (Desc)
                            </option>
                        </select>
                    </div> */}
                    <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <div className="w-full mx-1">
                            <button
                                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full bg-emerald-700"
                                onClick={() => handleSearch()}
                            >
                                Filter
                            </button>
                        </div>
                        <div className="w-full mx-1">
                            <button
                                className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-600 dark:text-gray-400 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm dark:bg-gray-700"
                                onClick={handleReset}
                            >
                                <span className="text-black dark:text-gray-200">
                                    Reset
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
