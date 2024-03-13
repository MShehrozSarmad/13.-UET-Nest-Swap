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
				className={` border-solid text-slate-950 ${className} `}
				id={id}
				ref={ref}
				{...props}
			/>
		</div>
	);
});

export default Input;
