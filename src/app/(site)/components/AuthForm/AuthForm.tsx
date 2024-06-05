"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import SignInForm from "@/app/(site)/components/AuthForm/SignInForm";
import SignUpForm from "@/app/(site)/components/AuthForm/SignUporm";
import SocialButton from "@/app/(site)/components/AuthForm/SocialButton";
import { BsGoogle, BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "SIGN_IN" | "SIGN_UP";

type Action = "google" | "facebook" | "github" | "linkedin";

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();
	const [variant, setVariant] = useState<Variant>("SIGN_IN");
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
		defaultValues: {
			username: "",
			email: "",
			password: ""
		}
	});

	useEffect(() => {
		if (session.status === "authenticated") {
			router.push("/dashboard");
		}
	}, [router, session?.status]);

	const toggleVariant = useCallback(() => {
		if (variant === "SIGN_IN") {
			setVariant("SIGN_UP");
		} else {
			setVariant("SIGN_IN");
		}
	}, [variant]);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);

		if (variant === "SIGN_IN") {
			signIn("credentials", {
				...data,
				redirect: false
			}).then((callback) => {
				if (callback?.error) {
					toast.error(callback.error);
				}
				if (callback?.ok && !callback?.error) {
					toast.success("Logged in");
				}
			}).finally(() => {
				setLoading(false);
			});
		}

		if (variant === "SIGN_UP") {
			axios.post("/api/signup", data)
				.then(() => toast.success("Signed up successfully"))
				.catch(error => toast.error(error))
				.finally(() => {
					reset();
					setLoading(false);
				});
		}
	};

	const socialAction = (action: Action) => {
		setLoading(true);

		signIn(action, { redirect: false })
			.then((callback) => {
				console.log(callback);
				if (callback?.error) {
					toast.error(callback.error);
				}
				if (callback?.ok && !callback?.error) {
					toast.success("Logged in");
				}
			})
			.catch(error => toast.error(error))
			.finally(() => setLoading(false));
	};

	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-lg">
			<div className="bg-white px-10 py-8 shadow rounded-lg">
				<form onSubmit={handleSubmit(onSubmit)}>
					{
						variant === "SIGN_IN" ?
							<SignInForm register={register} errors={errors} /> :
							<SignUpForm register={register} errors={errors} />
					}
					<div className="mt-8">
						<Button
							type="submit"
							disabled={loading}
							fullWidth>
							{variant === "SIGN_IN" ? "Sign In" : "Sign Up"}
						</Button>
					</div>
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="border-t border-gray-300 w-full"></div>
							</div>
							<div className="relative flex justify-center items-center">
								<span className="bg-white px-2 text-gray-500 font-bold">Or continue with</span>
							</div>
						</div>
					</div>
					<div className="flex gap-2 mt-6">
						<SocialButton icon={BsFacebook} onClick={() => socialAction("facebook")} />
						<SocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
					</div>
					<div className="flex gap-2 mt-6">
						<SocialButton icon={BsGithub} onClick={() => socialAction("github")} />
						<SocialButton icon={BsLinkedin} onClick={() => socialAction("linkedin")} />
					</div>
					<div className="flex gap-2 justify-center text-sm text-gray-500 mt-6 font-bold">
						<span>{variant === "SIGN_UP" ? "Already have an account?" : "Don't have any account?"}</span>
						<button type="button" onClick={toggleVariant} className="underline cursor-pointer">
							{variant === "SIGN_UP" ? "Sign in" : "Sign up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthForm;
