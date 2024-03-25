import React, { useId } from "react";

const Select = ({ options, label, className, ...props }, ref) => {
	const id = useId();

	return(
        <div className="w-full">
            {label && <label htmlFor={id} className="">{label}</label>}
            <select {...props} id={id} className={`px-3 py-2 rounded-lg outline-none bg-[#054bb6e6] focus:bg-[#0144aae6] text-white duration-200  w-full ${className} ${props.disabled ? 'filter contrast-[.7]' : null}`}>
                {
                    options?.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};

export default React.forwardRef(Select);