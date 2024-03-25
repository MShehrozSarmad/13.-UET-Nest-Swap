import React, { useId } from "react";

const Input = React.forwardRef(function Input(
	{ label, type = "text", className = "", lblClass, ...props },
	ref
) {
	const id = useId();
	return (
		<div>
			{label && <label className={lblClass} htmlFor={id}>{label}</label>}
			<input
				type={type}
				className={` border-none focus:outline-none focus:bg-[#00245b94] bg-[#054bb6e6] h-10 text-white ${className} ${type == 'file' ? 'file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm  file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none !bg-transparent !font-normal text-md' : null} ${props.disabled ? 'filter contrast-[.7]' : null}`}
				id={id}
				ref={ref}
				{...props}
			/>
		</div>
	);
});

export default Input;