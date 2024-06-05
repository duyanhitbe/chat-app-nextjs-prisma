import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastContext from "@/app/context/ToastContext";
import AuthContext from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chat App NextJS Prisma",
	description: "Chat App NextJS Prisma"
};

export default function RootLayout({
									   children
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthContext>
					<ToastContext />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
