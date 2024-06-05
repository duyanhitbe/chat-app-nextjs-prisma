import React from "react";
import Input from "@/app/components/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type SignUpFormProps = {
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
												   errors,
												   register
											   }) => {
	return (
		<>
			<p className="title text-center">Sign Up</p>
			<Input id="email" label="Email" register={register} errors={errors} />
			<Input id="username" label="Username" register={register} errors={errors} />
			<Input id="password" label="Password" type="password" register={register} errors={errors} />
		</>
	);
};

export default SignUpForm;
