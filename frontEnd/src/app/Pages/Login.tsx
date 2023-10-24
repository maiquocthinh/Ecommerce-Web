import Cookies from "js-cookie";
import { useEffect, useState, ChangeEvent } from "react";
import { loginFormControls } from "@/utils/Data";
import InputForm from "@/Components/FormData/InputForm/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../action/UserAction";
import { UserType } from "@/common";
import { toast } from "react-toastify";
import Notification from "@/Components/Notification";
import ComponentLevelLoader from "@/Components/Loader/componentlevel";
import { setComponentLevelLoading } from "../Slices/common/componentLeveLoadingSlice";
const initialFormdata = {
    email: "",
    password: "",
};

export default function Login() {
    const [formData, setFormData] = useState<UserType.userLoginType>(initialFormdata);
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    const data = useSelector((state: { auth: UserType.AuthState }) => state.auth.data)
    const err = useSelector((state: { auth: UserType.AuthState }) => state.auth.error)
    const isLoggedIn = useSelector((state: { auth: UserType.AuthState }) => state.auth.isLoggedIn)
    const componentLeveLoading = useSelector((state: any) => state.componentLeveLoading.isLoading)
    const route = useNavigate()
    const handleLogin = () => {
        if (isValidForm()) {
            dispatch(setComponentLevelLoading(true))
            dispatch(login(formData))
        } else {
            toast.error("vui lòng nhập đầy đủ thông tin", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    const isValidForm = () => {
        return formData &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.email.toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    }
    useEffect(() => {
        if (isLoggedIn) {
            Cookies.set("token", data.token);
            localStorage.setItem("user", JSON.stringify(formData));
            toast.success("đăng nhập thành công", {
                position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(setComponentLevelLoading(false))
        }
    }, [isLoggedIn, data])
    useEffect(() => {
        if (data) {
            const userInfoString = localStorage.getItem("userInfo");
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                setFormData(userInfo)
                localStorage.clear()
            }
        }
    }, [data])
    useEffect(() => {
        if (err !== null && componentLeveLoading) {
            toast.error("tài khoản không tồn tại", {
                position: toast.POSITION.TOP_RIGHT,
            })
            dispatch(setComponentLevelLoading(false))
        }
        if (isLoggedIn) route("/");
    }, [isLoggedIn, err]);
    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col  h-[90vh] justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mr-0 mb-0 ml-0 relative max-w-2xl lg:w-5/12">
                        <div className="flex md:min-w-[600px]   shadow-custom  flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                Login
                            </p>
                            <img src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png" className="h-[160px] mt-2 object-cover object-center" alt="" />
                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                {loginFormControls.map((controlItem) =>
                                    controlItem.componentType === "input" ? (
                                        <InputForm
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={
                                                controlItem.placeholder
                                            }
                                            lable={controlItem.label}
                                            value={formData[controlItem.id as keyof typeof formData]}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                setFormData({
                                                    ...formData,
                                                    [controlItem.id]:
                                                        event.target.value,
                                                });
                                            }}
                                        />
                                    ) : null
                                )}
                                <button
                                    disabled={componentLeveLoading}
                                    onClick={handleLogin}
                                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                                >

                                    {componentLeveLoading
                                        ? (
                                            <ComponentLevelLoader
                                                text={"loging"}
                                                color={"#ffffff"}
                                                loading={componentLeveLoading}
                                            />
                                        ) : (
                                            "login"
                                        )}
                                </button>
                                <div className="flex gap-2 text-sm mt-4 text-center justify-center">
                                    <span>You don't have account ? </span>
                                    <nav
                                        onClick={() => navigate("/register")}
                                        className="text-red-500 underline cursor-pointer"
                                    >
                                        register
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
}
