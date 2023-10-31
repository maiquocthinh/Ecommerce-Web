import { Link, useNavigate } from "react-router-dom";
import { registrationFormControls } from "@/utils/Data";
import InputForm from "@/Components/FormData/InputForm/InputForm";
import OptionForm from "@/Components/FormData/OptionForm/OptionForm";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../action/UserAction";
import { toast } from "react-toastify";
import { UserType } from "@/common";
import { setComponentLevelLoading } from "../Slices/common/componentLeveLoadingSlice";
import ComponentLevelLoader from "@/Components/Loader/componentlevel";
const isRegistered = false;
const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
};

const Register = () => {
    const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
    const dispatch = useDispatch<any>()
    const data = useSelector((state: { auth: UserType.AuthState }) => state.auth.data)
    const err = useSelector((state: { auth: UserType.AuthState }) => state.auth.error)
    const componentLeveLoading = useSelector((state: any) => state.componentLeveLoading.isLoading)

    const navigate = useNavigate();
    const isFormValid = () => {
        return formData &&
            formData.firstName &&
            formData.lastName.trim() !== "" &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    }
    const handleRegisterOnSubmit = () => {
        if (isFormValid()) {
            dispatch(setComponentLevelLoading(true))
            dispatch(register(formData))
        } else {
            dispatch(setComponentLevelLoading(false))
            toast.error("không hợp lệ", {
                position: toast.POSITION.TOP_RIGHT,
            });
            setFormData(initialFormData);
        }
        dispatch(setComponentLevelLoading(false))
    }
    useEffect(() => {
        if (data.accessToken !== "") {
            toast.success("đăng kí thành công", {
                position: toast.POSITION.TOP_RIGHT,
            });
            localStorage.setItem("userInfo", JSON.stringify(formData))
            setFormData(initialFormData);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
        if (err) {
            dispatch(setComponentLevelLoading(false))
            toast.error("lỗi hệ thống, vui lòng quay lại sau vài phút", {
                position: toast.POSITION.TOP_RIGHT,
            });
            setFormData(initialFormData);
        }
    }, [data, err])
    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex min-h-[90vh]  flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full md:min-w-[600px] mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex  flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-3xl font-medium text-center font-serif">
                                {isRegistered
                                    ? "Registration Successfull !"
                                    : "Sign up for an account"}
                            </p>
                            <img src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png" className="h-[160px] mt-2 object-cover object-center" alt="" />
                            {isRegistered ? (
                                <button
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {registrationFormControls.map(
                                        (controlItem) =>
                                            controlItem.componentType ===
                                                "input" ? (
                                                <InputForm
                                                    key={controlItem.id}
                                                    type={controlItem.type}
                                                    placeholder={
                                                        controlItem.placeholder
                                                    }
                                                    lable={controlItem.label}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                        setFormData({
                                                            ...formData,
                                                            [controlItem.id]:
                                                                event.target
                                                                    .value,
                                                        });
                                                    }}
                                                    value={formData[controlItem.id as keyof typeof formData]}
                                                />
                                            ) : null
                                    )}
                                    <button
                                        onClick={handleRegisterOnSubmit}
                                        className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                                    >
                                        {
                                            componentLeveLoading ? <ComponentLevelLoader loading={componentLeveLoading} color="#fff" text="registing" /> : "register"
                                        }

                                    </button>
                                </div>
                            )}
                            <div className="flex gap-2 text-sm mt-4">
                                <span>You have account ? </span>
                                <nav
                                    onClick={() => navigate("/login")}
                                    className="text-red-500 underline cursor-pointer"
                                >
                                    Login
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;