import { GoKey } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../action/UserAction";
import { MdOutlineAirlineStops } from "react-icons/md";
const ResetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isOTP, setIsOTP] = useState<boolean>(false);
    const [OTP, setOTP] = useState<string>("");
    const route = useNavigate();
    const resetPasswordData = useSelector(
        (state: any) => state.resetPassword.data
    );
    const dispatch = useDispatch<any>();
    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    const handleResetPassword = () => {
        if (validateEmail(email)) {
            dispatch(resetPassword(email));
        }
    };
    return !isOTP ? (
        <div className="max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Reset password</h1>
            <div className="my-10">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">
                            Email address
                        </p>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter email address"
                        />
                    </label>

                    <button
                        onClick={handleResetPassword}
                        className="w-full py-3 font-medium text-white bg-custom-primary opacity-80 hover:opacity-100 rounded-lg border-custom-primary hover:shadow inline-flex space-x-2 items-center justify-center"
                    >
                        <GoKey className="w-6 h-6" />
                        <span>Reset password</span>
                    </button>
                    <div className="text-center">
                        <p>Not registered yet?</p>
                        <div
                            onClick={() => route("/register")}
                            className="underline cursor-pointer text-custom-primary font-medium inline-flex space-x-1 items-center"
                        >
                            <span>Register now </span>
                            <div>
                                <MdOutlineAirlineStops className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto mt-24">
            <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">xác nhận OTP</h2>
                <p className="text-md md:text-xl">
                    mã OTP đã gửi tới email của bạn
                </p>
            </div>
            <div className="flex flex-col max-w-md space-y-5">
                <input
                    type="text"
                    placeholder="otp"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                />
                <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-custom-bg_button bg-custom-bg_button text-white">
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
