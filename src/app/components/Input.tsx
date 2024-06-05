import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

type InputProps = {
	id: string;
	label: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
										 id,
										 disabled,
										 errors,
										 register,
										 label,
										 required,
										 type
									 }) => {
	return (
		<div>
			<label className="font-bold text-gray-900 block text-sm leading-6 mt-5" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				disabled={disabled}
				required={required}
				type={type}
				autoComplete={id}
				{...register(id, { required })}
				className={clsx(`
					form-input
					block
					mt-3
					w-full
					rounded-md
					border-0
					py-1.5
					text-gray-900
					shadow-sm
					ring-1
					ring-inset
					ring-gray-300
					placeholder:text-gray-400
					focus:ring-2
					focus:ring-inset
					focus:ring-sky-600
					sm:text-sm
					sm:leading-6`,
					errors[id] && `focus:ring-rose-500`,
					disabled && "opacity-50 cursor-default")}
			/>
		</div>
	);
};

export default Input;
