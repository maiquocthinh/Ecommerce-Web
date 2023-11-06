import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import { profileType } from "@/common/user";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useState, ChangeEvent } from "react";
import InputForm from "@/Components/FormData/InputForm/InputForm";
interface EditProfileProps {
    data: profileType;
    showUpdateAccount: boolean;
    setShowUpdateAccount: (check: boolean) => void;
    setReloadData: (isReload: boolean) => void;
}
const EditProfile: React.FC<EditProfileProps> = ({
    data,
    showUpdateAccount,
    setShowUpdateAccount,
    setReloadData,
}) => {
    const [formData, setFormData] = useState<profileType>(data);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <CenterModal
            showButtons={true}
            show={showUpdateAccount}
            setShow={() => setShowUpdateAccount(!showUpdateAccount)}
            showModalTitle={true}
            modalTitle={
                <div className="flex gap-2 justify-center items-center">
                    <AiOutlineEdit
                        className="text-custom-Colorprimary"
                        size={26}
                    />
                    <h1 className="text-2xl font-bold">chỉnh sửa tài khoản</h1>
                </div>
            }
            mainContent={
                <div>
                    <div className="flex flex-col gap-6 items-center">
                        <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
                            <input
                                type="file"
                                className="hidden"
                                x-ref="photo"
                                x-on:change="
        const fileInput = $refs.photo;
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const photoName = file.name;
            const reader = new FileReader();

            reader.onload = (e) => {
                const photoPreview = e.target.result;
                console.log(photoName, photoPreview);
            };

            reader.readAsDataURL(file);
        }
    "
                            />

                            <div className="text-center">
                                <div className="mt-2" x-show="! photoPreview">
                                    <img
                                        alt=""
                                        src={data.avatarUrl}
                                        className="w-40 h-40 m-auto rounded-full shadow"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-custom-Colorprimary focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                                >
                                    Select New Photo
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <InputForm
                                lable="email"
                                placeholder="nhập email"
                                value={formData.email}
                                name="email"
                                onChange={handleOnChange}
                                type="text"
                            />
                            <InputForm
                                lable="phoneNumber"
                                placeholder="nhập phoneNumber"
                                value={formData.phoneNumber}
                                name="phoneNumber"
                                onChange={handleOnChange}
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-8">
                            <InputForm
                                lable="firstName"
                                placeholder="nhập firstName"
                                value={formData.firstName}
                                name="firstName"
                                onChange={handleOnChange}
                                type="text"
                            />
                            <InputForm
                                lable="lastName"
                                placeholder="nhập lastName"
                                value={formData.lastName}
                                name="lastName"
                                onChange={handleOnChange}
                                type="text"
                            />
                        </div>
                    </div>
                    <div
                        onClick={() => setShowUpdateAccount(false)}
                        className="absolute top-8 right-8 text-custom-Colorprimary cursor-pointer"
                    >
                        <AiOutlineClose size={28} />
                    </div>
                </div>
            }
            buttonComponent={
                <div className="flex justify-center items-center pb-2">
                    <button className="border px-4 py-2 text-sm font-bold border-custom-primary rounded-md">
                        cập nhật
                    </button>
                </div>
            }
        />
    );
};

export default EditProfile;
