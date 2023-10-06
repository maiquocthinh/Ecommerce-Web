import { FaCalendarWeek } from "@react-icons/all-files/fa/FaCalendarWeek"
const UserInfoItem = () => {
    return (
        <div className="flex flex-col gap-1 items-center  text-lg">
            <span>Ngaỳ tham gia</span>
            <FaCalendarWeek className="text-custom-Colorprimary text-[45px]" />
            <span>10/10/10</span>
        </div>
    );
}

export default UserInfoItem;