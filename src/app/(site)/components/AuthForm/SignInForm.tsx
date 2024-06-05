import React from "react";
import Input from "@/app/components/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type SignInFormProps = {
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const SignInForm: React.FC<SignInFormProps> = ({
												   errors,
												   register
											   }) => {
	return (
		<>
			<p className="title text-center">Sign In</p>
			<Input id="email" label="Email" register={register} errors={errors} />
			<Input id="password" label="Password" type="password" register={register} errors={errors} />
		</>
	);
};

export default SignInForm;
