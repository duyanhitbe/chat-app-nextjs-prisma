import React from "react";
import clsx from "clsx";

type ButtonProps = {
	type?: "button" | "submit" | "reset";
	fullWidth?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	disabled,
	danger,
	type,
	onClick,
	secondary,
	fullWidth,
	children
									   }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(`
				px-3
				py-2
				rounded-md
				flex
				justify-center
				font-semibold
				focus-visible:outline
				focus-visible:outline-2
				focus-visible:outline-offset-2`,
				disabled && "opacity-50 cursor-default",
				fullWidth && "w-full",
				secondary ? "text-gray-900" : "text-white",
				danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
				!danger && !secondary && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600")}>
			{children}
		</button>
	);
};

export default Button;
