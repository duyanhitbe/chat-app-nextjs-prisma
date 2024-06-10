"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
import Image from "next/image";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { User } from "@prisma/client";

type MessageBoxProps = {
	message: FullMessage;
	isLast: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
												   message,
												   isLast
											   }) => {
	const session = useSession();
	const { conversationId } = useConversation();

	const isOwner = session?.data?.user?.email === message.sender.email;
	const seenAvatar = (message.seen || [])
		.filter(user => user.email !== session?.data?.user?.email)
		.map(user => user.image);

	const containerClassName = clsx(
		`flex gap-3 p-4`,
		isOwner && "justify-end"
	);
	const avatarClassName = clsx(isOwner && "order-2");
	const bodyClassName = clsx(
		`flex flex-col gap-2`,
		isOwner && "items-end"
	);
	const messageClassName = clsx(
		`text-sm w-fit overflow-hidden`,
		isOwner ? "bg-sky-500 text-white" : "bg-gray-100",
		message.image ? "rounded-md p-0" : "rounded-full px-3 py-2"
	);

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);


	return (
		<div className={containerClassName}>
			{
				!isOwner && <div className={avatarClassName}>
					<Avatar user={message.sender} />
				</div>
			}
			<div className={bodyClassName}>
				<div className={messageClassName}>
					{
						message.image
							? <Image
								alt="Image"
								height="288"
								width="288"
								src={message.image}
								className="
								object-cover
								transition
								translate
								cursor-pointer
								hover:scale-10" />
							: <div>{message.body}</div>
					}
				</div>
				<div className="text-xs text-gray-400">{format(message.createdAt, "p")}</div>
				{
					isLast && isOwner && seenAvatar.length > 0 &&
					seenAvatar.map((avatar) =>
						<Avatar key={avatar} user={{ image: avatar } as User} size="xs" />
					)
				}
			</div>
		</div>
	);
};

export default MessageBox;
