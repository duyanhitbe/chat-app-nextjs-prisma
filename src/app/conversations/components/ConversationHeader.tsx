"use client";
import React, { useMemo } from "react";
import { useOtherUser } from "@/app/hooks/useOtherUser";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";

type ConversationHeaderProps = {
	conversation: Omit<FullConversation, "messages">
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
																   conversation
															   }) => {
	const otherUser = useOtherUser(conversation);

	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`;
		}

		return "Active";
	}, [conversation]);

	return (
		<div className="
			w-full
			flex
			justify-between
			items-center
			py-3
			px-4
			sm:px-4
			lg:px-6
			shadow-sm
			border-b-[1px]
		">
			<div className="flex gap-3 items-center">
				<Link href="/conversations" className="
					text-sky-500
					hover:text-sky-600
					lg:hidden
					block
					transition
					cursor-pointer
				">
					<HiChevronLeft size={32} />
				</Link>
				<Avatar user={otherUser} />
				<div className="flex flex-col">
					<div className="font-medium">{conversation.name || otherUser?.name}</div>
					<div className="text-sm font-light text-neutral-500">{statusText}</div>
				</div>
			</div>
			<HiEllipsisHorizontal
				size={32}
				onClick={() => {}}
				className="
					text-sky-500
					hover:text-sky-600
					cursor-pointer
					transition
				"
			/>
		</div>
	);
};

export default ConversationHeader;
