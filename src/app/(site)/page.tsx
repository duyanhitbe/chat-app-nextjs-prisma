import Image from "next/image";
import AuthForm from "@/app/(site)/components/AuthForm/AuthForm";

export default function Home() {
	return (
		<div className="flex flex-col justify-center h-[100vh] bg-gray-100 gap-5">
			<AuthForm />
		</div>
	);
}
