import { AiOutlineDelete } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { LiaSearchPlusSolid } from "react-icons/lia";

const Table = () => {
    return (
        <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg mb-8 rounded-b-lg">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">
                                <input
                                    id="selectAll"
                                    name="selectAll"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">PRODUCT NAME</td>
                            <td className="px-4 py-2">CATEGORY</td>
                            <td className="px-4 py-2">price</td>
                            <td className="px-4 py-2">Sale Price</td>
                            <td className="px-4 py-2">STOCK</td>
                            <td className="px-4 py-2">STATUS</td>
                            <td className="px-4 py-2 text-center">View</td>
                            <td className="px-4 py-2 text-center">PUBLISHED</td>
                            <td className="px-4 py-2 text-right">ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                        <tr>
                            <td className="px-4 py-2">
                                <input
                                    id="6541eb2d26172f00083fb2fc"
                                    name="asysasa"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <div className="relative rounded-full inline-block w-8 h-8">
                                        <img
                                            className="object-cover w-full h-full rounded-full"
                                            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                            alt="product"
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                        ></div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium ">
                                            asysasa
                                        </h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Category 7</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">10</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-emerald-600 bg-emerald-100 dark:bg-emerald-800 dark:text-emerald-100">
                                    Selling
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <a
                                    className="flex justify-center text-gray-400 hover:text-emerald-600"
                                    href="/product/6541eb2d26172f00083fb2fc"
                                >
                                    <p
                                        data-tip="true"
                                        data-for="view"
                                        className="text-xl"
                                    >
                                        <LiaSearchPlusSolid />
                                    </p>
                                </a>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <div className="relative inline-block text-left">
                                    <div className="h-6 w-12 rounded-full bg-green-500 transition duration-250 ease-in-out">
                                        <div className="flex justify-center items-center w-28 h-full text-white text-sm pl-20 pt-1">
                                            {/* Content for the left side of the switch */}
                                        </div>
                                    </div>
                                    <div className="h-6 w-12 absolute opacity-0 right-0 top-0">
                                        <div className="flex items-center h-full w-32 text-white text-sm pr-22 pt-1">
                                            đasa
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-white inline-block rounded-full absolute transform translate-x-16 top-1 transition-all duration-250 ease-in-out shadow-md"></div>
                                    <input
                                        type="checkbox"
                                        role="switch"
                                        aria-checked="true"
                                        className="hidden"
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end text-right">
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="edit"
                                            className="text-xl"
                                        >
                                            <BsJournalBookmark size={22} />
                                        </p>
                                    </button>
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="delete"
                                            className="text-xl"
                                        >
                                            <AiOutlineDelete size={22} />
                                        </p>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">
                                <input
                                    id="6541eb2d26172f00083fb2fc"
                                    name="asysasa"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <div className="relative rounded-full inline-block w-8 h-8">
                                        <img
                                            className="object-cover w-full h-full rounded-full"
                                            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                            alt="product"
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                        ></div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium ">
                                            asysasa
                                        </h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Category 7</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">10</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-emerald-600 bg-emerald-100 dark:bg-emerald-800 dark:text-emerald-100">
                                    Selling
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <a
                                    className="flex justify-center text-gray-400 hover:text-emerald-600"
                                    href="/product/6541eb2d26172f00083fb2fc"
                                >
                                    <p
                                        data-tip="true"
                                        data-for="view"
                                        className="text-xl"
                                    >
                                        <LiaSearchPlusSolid />
                                    </p>
                                </a>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <div className="relative inline-block text-left">
                                    <div className="h-6 w-12 rounded-full bg-green-500 transition duration-250 ease-in-out">
                                        <div className="flex justify-center items-center w-28 h-full text-white text-sm pl-20 pt-1">
                                            {/* Content for the left side of the switch */}
                                        </div>
                                    </div>
                                    <div className="h-6 w-12 absolute opacity-0 right-0 top-0">
                                        <div className="flex items-center h-full w-32 text-white text-sm pr-22 pt-1">
                                            đasa
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-white inline-block rounded-full absolute transform translate-x-16 top-1 transition-all duration-250 ease-in-out shadow-md"></div>
                                    <input
                                        type="checkbox"
                                        role="switch"
                                        aria-checked="true"
                                        className="hidden"
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end text-right">
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="edit"
                                            className="text-xl"
                                        >
                                            <BsJournalBookmark size={22} />
                                        </p>
                                    </button>
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="delete"
                                            className="text-xl"
                                        >
                                            <AiOutlineDelete size={22} />
                                        </p>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">
                                <input
                                    id="6541eb2d26172f00083fb2fc"
                                    name="asysasa"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <div className="relative rounded-full inline-block w-8 h-8">
                                        <img
                                            className="object-cover w-full h-full rounded-full"
                                            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                            alt="product"
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                        ></div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium ">
                                            asysasa
                                        </h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Category 7</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">10</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-emerald-600 bg-emerald-100 dark:bg-emerald-800 dark:text-emerald-100">
                                    Selling
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <a
                                    className="flex justify-center text-gray-400 hover:text-emerald-600"
                                    href="/product/6541eb2d26172f00083fb2fc"
                                >
                                    <p
                                        data-tip="true"
                                        data-for="view"
                                        className="text-xl"
                                    >
                                        <LiaSearchPlusSolid />
                                    </p>
                                </a>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <div className="relative inline-block text-left">
                                    <div className="h-6 w-12 rounded-full bg-green-500 transition duration-250 ease-in-out">
                                        <div className="flex justify-center items-center w-28 h-full text-white text-sm pl-20 pt-1">
                                            {/* Content for the left side of the switch */}
                                        </div>
                                    </div>
                                    <div className="h-6 w-12 absolute opacity-0 right-0 top-0">
                                        <div className="flex items-center h-full w-32 text-white text-sm pr-22 pt-1">
                                            đasa
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-white inline-block rounded-full absolute transform translate-x-16 top-1 transition-all duration-250 ease-in-out shadow-md"></div>
                                    <input
                                        type="checkbox"
                                        role="switch"
                                        aria-checked="true"
                                        className="hidden"
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end text-right">
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="edit"
                                            className="text-xl"
                                        >
                                            <BsJournalBookmark size={22} />
                                        </p>
                                    </button>
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="delete"
                                            className="text-xl"
                                        >
                                            <AiOutlineDelete size={22} />
                                        </p>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">
                                <input
                                    id="6541eb2d26172f00083fb2fc"
                                    name="asysasa"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <div className="relative rounded-full inline-block w-8 h-8">
                                        <img
                                            className="object-cover w-full h-full rounded-full"
                                            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                            alt="product"
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                        ></div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium ">
                                            asysasa
                                        </h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Category 7</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-semibold">
                                    $4.00
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">10</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-emerald-600 bg-emerald-100 dark:bg-emerald-800 dark:text-emerald-100">
                                    Selling
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <a
                                    className="flex justify-center text-gray-400 hover:text-emerald-600"
                                    href="/product/6541eb2d26172f00083fb2fc"
                                >
                                    <p
                                        data-tip="true"
                                        data-for="view"
                                        className="text-xl"
                                    >
                                        <LiaSearchPlusSolid />
                                    </p>
                                </a>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <div className="relative inline-block text-left">
                                    <div className="h-6 w-12 rounded-full bg-green-500 transition duration-250 ease-in-out">
                                        <div className="flex justify-center items-center w-28 h-full text-white text-sm pl-20 pt-1">
                                            {/* Content for the left side of the switch */}
                                        </div>
                                    </div>
                                    <div className="h-6 w-12 absolute opacity-0 right-0 top-0">
                                        <div className="flex items-center h-full w-32 text-white text-sm pr-22 pt-1">
                                            đasa
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-white inline-block rounded-full absolute transform translate-x-16 top-1 transition-all duration-250 ease-in-out shadow-md"></div>
                                    <input
                                        type="checkbox"
                                        role="switch"
                                        aria-checked="true"
                                        className="hidden"
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end text-right">
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="edit"
                                            className="text-xl"
                                        >
                                            <BsJournalBookmark size={22} />
                                        </p>
                                    </button>
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
                                        <p
                                            data-tip="true"
                                            data-for="delete"
                                            className="text-xl"
                                        >
                                            <AiOutlineDelete size={22} />
                                        </p>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
