import React, { useState } from "react";
import { BiTable, BiUserPin } from "react-icons/Bi";
import { FaJediOrder } from "react-icons/Fa";
import { FiSettings, FiUsers, FiLogOut } from "react-icons/Fi";
import { RxDashboard } from 'react-icons/rx';

type taskType = {
    id: string | number;
    Icon: React.ReactNode;
    label: string;
};
const AdminSidebar = () => {
    const [active, setActive] = useState<number | string>(1)
    const listTask: taskType[] = [
        {
            id: 1,
            Icon: <RxDashboard size={22} />,
            label: "Dashboard"
        },
        {
            id: 2,
            Icon: <BiTable size={22} />,
            label: "Catalog"
        },
        {
            id: 3,
            Icon: <FiUsers size={22} />,
            label: "Custommers"
        },
        {
            id: 4,
            Icon: <FaJediOrder size={22} />,
            label: "orders"
        },
        {
            id: 5,
            Icon: <BiUserPin size={22} />,
            label: "our Staff"
        },
        {
            id: 6,
            Icon: <FiSettings size={22} />,
            label: "Settings"
        },
    ]
    const handleTask = (task: taskType) => {
        setActive(task.id);
    };
    return (
        <div className="col-span-2 overflow-hidden left-0-0 top-0 bottom-0 p-4 bg-custom-admin_bg_content h-full text-custom-addmin_color">
            <div className="fixed w-56 flex flex-col justify-between h-full">
                <div className="flex-1 ">
                    <div className="h-[64px] flex items-center justify-start">
                        <img src="https://dashtar-admin.vercel.app/@/assets/logo-dark-a4d6f179.svg" alt="logo" className="h-[32px] object-contain ml-2" />
                    </div>
                    <div className="mt-6 w-full flex flex-col gap-4 text-[14px] font-medium">
                        {listTask.map(task =>
                            <div onClick={() => handleTask(task)} key={task.id} className={`flex gap-2 p-2  items-center cursor-pointer  transition-all duration-200 ${active === task.id ? "text-custom-addmin_Active__color" : "hover:text-white"}`} >
                                {task.Icon}
                                <span>{task.label}</span>
                            </div>
                        )
                        }
                    </div >
                </div >
                <div className="flex items-center  gap-3 justify-center w-full cursor-pointer text-center bg-[#0ea573] hover:bg-custom-addmin_Active__color rounded-lg py-3 text-white text-sm font-normal mb-8">
                    <FiLogOut />
                    <button className="border-none">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;