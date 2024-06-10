"use client";
import React, { useCallback, useState } from "react";
import { User } from "@prisma/client";
import Avatar from "@/app/components/Avatar";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserBoxProps = {
	user: User
}

const UserBox: React.FC<UserBoxProps> = ({
											 user
										 }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleClick = useCallback(() => {
		setLoading(true);

		axios.post("/api/conversations", {
			userId: user.id
		})
			.then(res => router.push(`/conversations/${res.data.id}`))
			.finally(() => setLoading(false))
	}, [router, user])

	return (

		<div
			onClick={handleClick}
			className="
				w-full
				relative
				flex
				items-center
				space-x-3
				bg-white
				p-3
				hover:bg-neutral-100
				rounded-lg
				transition
				cursor-pointer
			">

			<Avatar user={user} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="mb-1 flex justify-between items-center">
						<p className="text-sm font-medium text-gray-900">{user.name}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserBox;
