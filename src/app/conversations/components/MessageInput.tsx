import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type MessageInputProps = {
	id: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>
}

const MessageInput: React.FC<MessageInputProps> = ({
													   id,
													   register
												   }) => {
	return (
		<div className="relative w-full">
			<input
				id={id}
				type="text"
				autoComplete="off"
				required
				placeholder="Write a message"
				{...register(id, { required: false })}
				className="
					text-black
					font-light
					py-2
					px-4
					bg-neutral-100
					w-full
					rounded-full
					focus:outline-none
				"
			/>
		</div>
	);
};

export default MessageInput;
