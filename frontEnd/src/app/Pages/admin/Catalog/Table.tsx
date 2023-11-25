import { brandType, categoryType, needType } from "@/common/catalog";
import { AiOutlineDelete } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { LiaSearchPlusSolid } from "react-icons/lia";

interface TableProps {
    data: categoryType[] | needType[] | brandType[];
}
const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg mb-8 rounded-b-lg">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">ID</td>
                            <td className="px-4 py-2">NAME</td>
                            <td className="px-4 py-2">DESCRIPTION</td>
                            <td className="px-4 py-2 text-right">ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                        {data.length &&
                            data.map((item: any) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">
                                            {item.id}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {item.name || item.title}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm font-semibold">
                                            {item.description}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-end text-right">
                                            <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                                                <p
                                                    data-tip="true"
                                                    data-for="edit"
                                                    className="text-xl"
                                                >
                                                    <BsJournalBookmark
                                                        size={22}
                                                    />
                                                </p>
                                            </button>
                                            <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
                                                <p
                                                    data-tip="true"
                                                    data-for="delete"
                                                    className="text-xl"
                                                >
                                                    <AiOutlineDelete
                                                        size={22}
                                                    />
                                                </p>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
