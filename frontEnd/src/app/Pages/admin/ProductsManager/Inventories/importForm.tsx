interface ImportFormProps {
    formData?: any;
    setFormData?: any;
}
const ImportForm: React.FC<ImportFormProps> = ({ formData, setFormData }) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="flex gap-4 justify-start items-start p-2">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                        <p className="text-gray-300 text-sm text-start">
                            firstName:
                        </p>
                        <input
                            className="w-full h-[48px] px-2 rounded-[8px]"
                            type="text"
                            value={formData.firstName}
                            name="firstName"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleOnChange(e)}
                            placeholder="nhập họ và tên lót"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-300 text-sm text-start">
                            lastName :
                        </p>
                        <input
                            className="w-full h-[48px] px-2 rounded-[8px]"
                            type="text"
                            value={formData.lastName}
                            name="lastName"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleOnChange(e)}
                            placeholder="nhập tên"
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                        <p className="text-gray-300 text-sm text-start">
                            email:
                        </p>
                        <input
                            className="w-full h-[48px] px-2 rounded-[8px]"
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleOnChange(e)}
                            placeholder="nhập email"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-300 text-sm text-start">
                            chọn giới tính :
                        </p>
                        <SelecterLab
                            options={[
                                {
                                    id: 1,
                                    title: "nam",
                                },
                                {
                                    id: 2,
                                    title: "nữ",
                                },
                            ]}
                            handleGetOptionBySelect={handleGetOptionBySelect}
                            typeId="gender"
                            valueUpdate={formData.gender ? ["nam"] : ["nữ"]}
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                        <p className="text-gray-300 text-sm text-start">
                            password:
                        </p>
                        <div className="relative">
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px] outline-none"
                                type={typePassword ? "password" : "text"}
                                value={formData.password}
                                name="password"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập password"
                            />

                            {typePassword ? (
                                <button
                                    onClick={() => setTypePassword(false)}
                                    className="absolute top-1/2 -translate-y-1/2 right-3"
                                >
                                    <MdOutlineRemoveRedEye size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setTypePassword(true)}
                                    className="absolute top-1/2 -translate-y-1/2 right-3"
                                >
                                    <FaRegEyeSlash size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-300 text-sm text-start">
                            phoneNumber :
                        </p>
                        <input
                            className="w-full h-[48px] px-2 rounded-[8px]"
                            type="text"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleOnChange(e)}
                            placeholder="nhập số điện thoại"
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="w-full">
                        <p className="text-gray-300 text-sm text-start">
                            birthday:
                        </p>
                        <input
                            className="w-full h-[48px] px-2 rounded-[8px]"
                            type="date"
                            value={formData.dayOfBirth?.split("T")[0]}
                            name="dayOfBirth"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleOnChange(e)}
                            placeholder="birthday"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportForm;
