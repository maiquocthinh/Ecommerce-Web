import UserInfoItem from "./userInfoItem";

const UserInfo = () => {
    return (
        <div className="w-1/2 shadow-custom bg-white p-4 pb-8 flex flex-col gap-2 rounded-borderContnet">
            <div className="flex flex-col items-center">
                <img src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png" alt="" width={80} height={80} className="p-2 border rounded-full" />
                <span className="text-lg">Xin chào</span>
                <span className="text-2xl font-bold text-custom-Colorprimary">Minh Hoàng</span>
            </div>
            <div className="flex gap-2 justify-between">
                <UserInfoItem />
                <UserInfoItem />
                <UserInfoItem />
            </div>
        </div>
    );
}

export default UserInfo;