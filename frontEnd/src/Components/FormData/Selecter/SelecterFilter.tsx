import React, { useEffect, useState } from "react";
import Select from "react-select";

interface SelecterFilterProps {
    options: any;
    handleGetOptionBySelect: (option: any, typeId: string) => void;
    typeId: string;
    defaultValue?: number;
    isMulti?: boolean;
}

const SelecterFilter: React.FC<SelecterFilterProps> = ({
    options,
    handleGetOptionBySelect,
    typeId,
    defaultValue,
    isMulti,
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const getOptionLabel = (option: any) => option.title || option.name;

    const getOptionValue = (option: any) =>
        option.value || option.title || option.name;
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: 8,
            height: isMulti ? "auto" : "48px",
            minHeight: "48px",
            borderColor: state.isFocused ? "#4c9aff" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 1px #4c9aff" : "none",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#4c9aff" : "white",
            color: state.isFocused ? "white" : "#333",
        }),
        input: (provided: any) => ({
            ...provided,
            color: "#333",
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: "#999",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#333",
        }),
    };
    useEffect(() => {
        if (selectedOption) {
            handleGetOptionBySelect(selectedOption, typeId);
        }
    }, [selectedOption]);
    return (
        <div className="h-full">
            <Select
                isMulti={isMulti ? true : false}
                onChange={setSelectedOption}
                options={options}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                styles={customStyles}
            />
        </div>
    );
};

export default SelecterFilter;
