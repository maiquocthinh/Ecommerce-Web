import { AiFillFire } from "@react-icons/all-files/ai/AiFillFire"
interface SearchModalProps {

}
const SearchModal: React.FC<SearchModalProps> = () => {
    return (
        <div className="absolute top-10 right-0 left-0 bg-white rounded-md">
            <div className="flex flex-col shadow-md max-h-[400px] overflow-y-auto">
                <div className="flex justify-between items-center p-3 text-md font-medium">
                    <span className="text-[#4a4a4a]">Kết quả</span>
                    <button className="border-none underline">Xem tất cả</button>
                </div>
                <div className="flex gap-2 p-2 cursor-pointer hover:bg-slate-100 rounded-md border-b justify-start">
                    <img src="https://yt3.ggpht.com/R8asb40C7_s6NBV5xz1QWZlNh66-n5FjDuqetjaIf8NmdagqI-dY9C29FumbUT4-LiKr9HA6cg=s88-c-k-c0x00ffffff-no-rj" alt="" className="w-12  h-12 rounded-full object-cover object-center border" />
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start">
                            <span>IP 14</span>
                            <span>345683476 D</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 p-2 cursor-pointer hover:bg-slate-100 rounded-md border-b justify-start">
                    <img src="https://yt3.ggpht.com/R8asb40C7_s6NBV5xz1QWZlNh66-n5FjDuqetjaIf8NmdagqI-dY9C29FumbUT4-LiKr9HA6cg=s88-c-k-c0x00ffffff-no-rj" alt="" className="w-12  h-12 rounded-full object-cover object-center border" />
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start">
                            <span>IP 14</span>
                            <span>345683476 D</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 p-2 cursor-pointer hover:bg-slate-100 rounded-md border-b justify-start">
                    <img src="https://yt3.ggpht.com/R8asb40C7_s6NBV5xz1QWZlNh66-n5FjDuqetjaIf8NmdagqI-dY9C29FumbUT4-LiKr9HA6cg=s88-c-k-c0x00ffffff-no-rj" alt="" className="w-12  h-12 rounded-full object-cover object-center border" />
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start">
                            <span>IP 14</span>
                            <span>345683476 D</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2 p-2">
                    <div className="flex items-center gap-1 border px-3 py-1 cursor-pointer font-medium text-sm rounded-full">
                        <span>IP 14</span>
                        <AiFillFire className="text-red-500 text-lg" />
                    </div>
                    <div className="flex items-center gap-1 border px-3 py-1 cursor-pointer font-medium text-sm rounded-full">
                        <span>IPhone</span>
                        <AiFillFire className="text-red-500 text-lg" />
                    </div>
                    <div className="flex items-center gap-1 border px-3 py-1 cursor-pointer font-medium text-sm rounded-full">
                        <span>samsung galaxy</span>
                        <AiFillFire className="text-red-500 text-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;