import React, { ChangeEvent } from "react";

interface InputFormProp {
    lable: string;
    placeholder: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name?: string;
    Icon?: React.ReactElement;
}
const InputForm: React.FC<InputFormProp> = ({
    lable,
    name,
    placeholder,
    value = "",
    onChange,
    type = "text",
    Icon,
}) => {
    return (
        <div className="relative">
            <p className="bg-white absolute pt-0 pr-2 pb-0 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
                {lable}
            </p>
            <input
                name={name}
                placeholder={placeholder}
                type={type || "text"}
                value={value}
                onChange={onChange}
                className={` border pl-4 placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 mr-0 mt-0 ml-0 text-base bg-white border-gray-300 rounded-md`}
            />
            {Icon && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#c2cad1]">
                    {Icon}
                </div>
            )}
        </div>
    );
};

export default InputForm;
