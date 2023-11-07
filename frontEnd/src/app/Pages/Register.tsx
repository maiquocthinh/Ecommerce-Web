import InputForm from "@/Components/FormData/InputForm/InputForm";
import ComponentLevelLoader from "@/Components/Loader/componentlevel";
import { UserType } from "@/common";
import { ChangeEvent, useEffect, useState } from "react";
import { BiLockAlt, BiUserPin } from "react-icons/Bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhoneFlip } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setComponentLevelLoading } from "../Slices/common/componentLeveLoadingSlice";
import { registerAction } from "../action/UserAction";
const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
};

const Register = () => {
    const [formData, setFormData] =
        useState<typeof initialFormData>(initialFormData);
    const dispatch = useDispatch<any>();
    const err = useSelector(
        (state: { auth: UserType.AuthState }) => state.auth.error
    );
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const registerData = useSelector((state: any) => state.registerData.data);
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
    };
    const handleRegisterOnSubmit = () => {
        if (isFormValid()) {
            dispatch(setComponentLevelLoading({ loading: true, id: "" }));
            dispatch(registerAction(formData)).then((response: any) => {
                if (!response.payload) {
                    dispatch(
                        dispatch(
                            setComponentLevelLoading({ loading: false, id: "" })
                        )
                    );
                    toast.error("vui lòng điền đủ thông tin", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (response.payload.success) {
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    toast.success("đăng kí thành công", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setFormData(initialFormData);
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }
            });
        } else {
            dispatch(setComponentLevelLoading({ loading: false, id: "" }));
            toast.error("vui lòng nhập đầy đủ thông tin", {
                position: toast.POSITION.TOP_RIGHT,
            });
            setFormData(initialFormData);
        }
    };
    //     if (data.accessToken !== "") {

    //     }
    //     if (err) {
    //         dispatch(setComponentLevelLoading({ loading: false, id: "" }));
    //         toast.error("lỗi hệ thống, vui lòng quay lại sau vài phút", {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //         setFormData(initialFormData);
    //     }
    // }, [data, err]);
    const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                <div className="flex  flex-col items-center justify-start py-4 px-8 bg-white shadow-2xl rounded-xl">
                    <p className="w-full text-3xl font-medium text-center font-serif">
                        register
                    </p>
                    <img
                        src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
                        className="h-[100px] mt-2 object-cover object-center"
                        alt=""
                    />
                    <div className="my-4 flex flex-col gap-6">
                        <div className="flex gap-2 items-center">
                            <InputForm
                                type="text"
                                placeholder="nhập firstName"
                                name="firstName"
                                lable="firstName"
                                onChange={handleOnchange}
                                value={formData.firstName}
                                Icon={<BiUserPin size={20} />}
                            />
                            <InputForm
                                type="text"
                                placeholder="nhập lastName"
                                lable="lastName"
                                name="lastName"
                                onChange={handleOnchange}
                                value={formData.lastName}
                                Icon={<BiUserPin size={20} />}
                            />
                        </div>
                        <InputForm
                            type="text"
                            placeholder="nhập email"
                            lable="email"
                            name="email"
                            onChange={handleOnchange}
                            value={formData.email}
                            Icon={<AiOutlineMail size={20} />}
                        />
                        <InputForm
                            type="password"
                            placeholder="nhập password"
                            lable="password"
                            name="password"
                            onChange={handleOnchange}
                            value={formData.password}
                            Icon={<BiLockAlt size={20} />}
                        />
                        <InputForm
                            type="text"
                            placeholder="nhập phoneNumber"
                            lable="phoneNumber"
                            name="phoneNumber"
                            onChange={handleOnchange}
                            value={formData.phoneNumber}
                            Icon={<BsPhoneFlip size={20} />}
                        />
                    </div>
                    <button
                        disabled={componentLoading.loading}
                        onClick={handleRegisterOnSubmit}
                        className="rounded-sm disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    >
                        {componentLoading.loading === true ? (
                            <ComponentLevelLoader
                                loading={componentLoading.loading === true}
                                color="#fff"
                                text="registing"
                            />
                        ) : (
                            "register"
                        )}
                    </button>
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
    );
};

export default Register;
