import React, { ChangeEvent } from "react";

interface InputFormProp {
    lable: string;
    placeholder: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
}
const InputForm: React.FC<InputFormProp> = ({ lable, placeholder, value = "", onChange, type = "text" }) => {

    return (
        <div>
            <p className="bg-white absolute pt-0 pr-2 pb-0 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
                {lable}
            </p>
            <input

                placeholder={placeholder}
                type={type || "text"}
                value={value}
                onChange={onChange}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base bg-white border-gray-300 rounded-md"
            />
        </div>
    );
}

export default InputForm;