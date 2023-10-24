import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
import { FcHome } from "@react-icons/all-files/fc/FcHome";
import { useState } from "react";
import { Link } from "react-router-dom";
import generatePathArray from "../../../utils/Pathname";
import { useDispatch } from "react-redux";
import { setPathArray } from "../../../app/Slices/common/pathSlice";

interface NavigateProps {
    listNav?: {
        title: string;
    }[]
}
const Navigate: React.FC<NavigateProps> = ({ listNav }) => {
    let path = '';
    const dispatch = useDispatch();
    const handleNav = () => {
        const pathname = location.pathname;
        const pathArray = generatePathArray(pathname);
        dispatch(setPathArray(pathArray));
    }
    return (
        <div className="flex justify-start items-center  w-full min-h-[20px] mt-1">
            <Link to="/" className="flex items-center" onClick={handleNav}>
                <FcHome />
                <span className="m-1 text-xs">Trang chủ</span>
            </Link>
            {listNav && listNav?.map((item, index) => {
                path += (`/${item.title}`)
                return (
                    <Link to={`${path}`} key={index} className="flex items-center" onClick={handleNav}>
                        <BsChevronRight />
                        <span className="m-1 text-xs">{item.title}</span>
                    </Link>
                )
            }
            )}
        </div>
    );
}

export default Navigate;