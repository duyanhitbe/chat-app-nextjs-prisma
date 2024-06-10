import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import clsx from "clsx";

type AvatarProps = {
	user?: User | null;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Avatar: React.FC<AvatarProps> = ({
										   user,
										   size
									   }) => {
	return (
		<div className="relative">
			<div className={clsx(
				"relative inline-block rounded-full overflow-hidden",
				size === "xs" ? "h-4 w-4" : "h-9 w-9 md:h-11 md:w-11"
			)}>
				<Image src={user?.image || "/images/placeholder.png"} alt="Avatar" fill />
			</div>
			{size !== "xs" && (
				<span className="
				absolute
				block
				rounded-full
				bg-green-500
				ring-2
				ring-white
				top-0
				right-0
				h-2
				W-2
				md:h-3
				md:w-3
			" />
			)}
		</div>
	);
};

export default Avatar;
